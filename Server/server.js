require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

try{
mongoose.connect(process.env.MONGO_URL);
} catch(err) {
    console.log(err);
}

const stat = new mongoose.Schema({
    statName:{
        type: String,
        minLength: 3,
        trim: true,
        required: true
    },
    value: {type: Number}
});

const gameStats = new mongoose.Schema({
    gameName: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    stats: [stat]
});

const playerSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5
      },
      email: {
        type: String,
        unique:true,
        lowercase: true,
        trim: true,
        required: true
      },
      password: {
        type: String,
        required: true,
        minLength: 32,
      },
      gameResults: [gameStats],
      friends: [String]
});

const Player = mongoose.model('Player',playerSchema);

const commentSchema = new mongoose.Schema({
    gameName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true, maxLength: 500 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

const gameSchema = new mongoose.Schema({
    gameName: { type: String, required: true, unique: true, trim: true },
    totalPlays: { type: Number, default: 0 }
});

const Comment = mongoose.model('Comment', commentSchema);
const Game = mongoose.model('Game', gameSchema);

function validateRegistration({username, email, password}) {
    if(!username || username.trim().length < 5) {
        return "username length must be 5 at minimum"
    }
    if(email === undefined || email.match(/.+@.+\..+/) == null) {
        return 'email must be in format text@text.text';
    }
    if(password === undefined || password.length < 8) {
        return 'password length must be 8 at minimum'
    }
    return '';
};

//registers a user
app.post("/api/register", async (req,res) => {
    const {username,email,password} = req.body;
    const err = validateRegistration({username, email, password});
    if(err) {
        return res.status(400).json({error: err})
    }
    
    if(await Player.findOne({username}) || await Player.findOne({email})) {
        return res.status(409).json({error: 'Username  or email already exists'})
    }

        try {
        const passHash = await bcrypt.hash(password,10);
        await Player.create({username,email,password: passHash});
        const player = await Player.findOne({username});
        const token = await jwt.sign({id: player._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(209).json({
            message: "Registration succesful.",
            player: {username: player.username, email: player.email},
            token: token,
        });

    } catch(error) {
        console.error("Login error:", error);
        return res.status(500).json({error: 'Server error.'});
    }
});

//logs a user in
app.post("/api/login",async (req,res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.status(400).json({error: "Username and password are incorrect."});
    }
    try {
        const player = await Player.findOne({username});
        if(!player || !(await bcrypt.compare(password, player.password))) {
            return res.status(409).json({
                error: "Username or password are incorrect",
            });
        }
        const token = await jwt.sign({id: player._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.status(200).json({
            message: "Login successful.",
            user: {username: player.username, email: player.email, friends: player.friends, gameResults: player.gameResults},
            token: token,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({error:"Server error."});
    }
});

// logs user out
app.post("/api/logout", async (req,res) => {
    if(!req.headers.authorization) {
        return res.status(401).json({error: "Missing or invalid token."})
    }
    const auth = req.headers.authorization;
    const authArr = auth.split(" ");

    if(authArr[0] != "Bearer") {
        return res.status(401).json({error: "Missing or invalid token."})
    }
    return res.status(200).json({message: "Logged out."});
});

// updates user scores, the body should include player username, a valid token, the game name
// body should be in JSON and use following format database requires these names, a
// {"username": "<username here>", "gameName": "<game name here>","stats": [{"statName": "<insert stat name here", "value": <insert value here>}]}

app.post("/api/leaderboard/update", async (req,res) => {
   
    // verify user, then update game stats, if the game has no stats, 
    // or the stat doesn't exist for the user, insert the new data

    try{
        const {username,gameName,stats} = req.body
        if(!username || !gameName|| !stats) {
            return res.status(409).json({error: "missing username gameName, or game stats"});
        }
        const player = await Player.findOne({username});
        if(!player) {
            return res.status(409).json({
                error: "Invalid username.",
            });
        }

        const isGame = (element) => element.gameName == gameName;

        //check if player has previously saved stats for game will receive index, or -1 if no stats
        const index = player.gameResults.findIndex(isGame);
        if(index > -1) {
            const playerStats = player.gameResults[index] // get array of game stats
            stats.forEach((element) => {
                const gameStats = (next) => next.statName == element.statName;
                let i = playerStats.stats.findIndex(gameStats);

                if(i < 0) {
                    console.log(player.gameResults[index]);
                    player.gameResults[index].stats.push(element);
                } else if(element.value > playerStats.stats[i].value){
                    playerStats.stats[i].value = element.value;
                }
        });
            player.gameResults[index] = playerStats;
        } else {//player has never played this game before, and we should save all stats

            const newStats = {gameName: gameName, stats: stats}
            player.gameResults.push(newStats);
        }
        await player.save();
        return res.status(200).json({message: "player scores updated"})
    } catch(err) {
        console.log(err);
        return res.status(401).json({message: "error updating scores"});
    }
});

// retreives leader board information, body should contain a game name, and the username of the user 
// sever will return the scores for all players for that game and the user scores
app.get("/api/leaderboard",async (req,res) => { 
    const {username,game} = req.body;
    if(!username || !game) {
        return res.status(409).json({error: 'no username or game'});
    }

    //for the user
    console.log(username,game);
    let players = await Player.find({'gameResults.gameName': game},'username gameResults');
    let user = {}
    const scores = [];
    for(i in players) {
        const player = players[i]
        const stats = players[i].gameResults.find((element) => element.gameName == game)
        if(players[i].username == username) {
            user = {username: username,stats: stats}
        } else {
            scores.push({username: player.username, stats: stats});
        }
    }
    return res.status(200).json({leaderBoard: scores, player: user});
});

app.post("/api/friends/add", async (req, res) => {
    const {username,friendName} = req.body
    const findFriend = (element) => element == friendName;
    try {
        player = await Player.findOne({username});
        if(Player.findOne({friendName}) && player.friends.findIndex(findFriend) < 0) {
            player.friends.push(friendName);
            await player.save();
        } else {
            return res.status(209).json({error: "player already in friends list, or doesn't exist"});
        }

    } catch(err) {
        console.error(err);
        return res.status(409).json({error : "problem adding friend"});
    }
    return res.status(200).json({message: "player added successfully"})
}); 

app.post("/api/friends/remove", async (req,res) => {
    const {username,friendName} = req.body
    const findFriend = (element) => element == friendName;
    if(!username || !friendName) {
        return res.status(400).json({error: "missing username or friendName"});
    }
    const player = await Player.findOne({username});
    let index = player.friends.findIndex(findFriend);
    if(index >= 0) {
        player.friends.splice(index,1);
        await player.save();
    }
    return res.status(200).json({message : "friend removed successfully"})
});

app.get("/api/games/:gameName/comments", async (req, res) => {
    const { gameName } = req.params;
    try {
        const comments = await Comment.find({ gameName }).sort({ createdAt: -1 }).limit(50);
        const game = await Game.findOne({ gameName });
        return res.status(200).json({ comments, totalPlays: game ? game.totalPlays : 0 });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch comments" });
    }
});

app.post("/api/games/:gameName/comments", async (req, res) => {
    const { gameName } = req.params;
    const { username, message, rating } = req.body;
    if (!username || !message || !message.trim()) {
        return res.status(400).json({ error: "Username and message are required" });
    }
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    try {
        await Comment.create({ gameName, username, message: message.trim(), rating });
        return res.status(201).json({ message: "Comment posted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to post comment" });
    }
});

app.post("/api/games/:gameName/play", async (req, res) => {
    const { gameName } = req.params;
    try {
        await Game.findOneAndUpdate(
            { gameName },
            { $inc: { totalPlays: 1 } },
            { upsert: true, new: true }
        );
        return res.status(200).json({ message: "Play recorded" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to record play" });
    }
});

app.use((req,res) => {
    return res.status(404).json({
        error: "Route not found.",
    });
});

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});
