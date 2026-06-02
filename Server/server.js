require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bycryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

app,use(cors());
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
        unique: true,
        required: true
    },
    value: {type: Number}
})
const gameStats = new mongoose.Schema({
    gameName: {
        type: String,
        minLength: 1,
        trim: true,
        unique: true,
        required: true
    },
    stats: [stat]
})
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
      gameResults: [gameStats]
});


const Player = mongoose.model('Player,userSchema');

function validateRegistration({username, email, password}) {
    if(!username || username.trim().length < 5) {
        return "username length must be 5 at minimum"
    }
    if(email !== undefined || email.match(/.+@.+\..+/) == null) {
        return 'email must be in format text@text.text';
    }
    if(password === undefined || password.length < 8) {
        return 'password length must be 8 at minimum'
    }
    return '';
}
//registers a user
app.post("/api/register", async (req,res) => {
    const err = validateRegistration({username, email, password});
    if(error) {
        return res.status(400).json({error: err})
    }
    try {
        if(await Player.findOne({username})) {
            return res.status(409).json({error: 'Username already exists'})
        }

        const passHash = await bcrypt.hash(password,10);
        await Player.create({username,email,password: passHash});
        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(209).json({
            message: "Registration succesful.",
            player: {username, email},
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
        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.status(200).json({
            message: "Login successful.",
            user: {username: player.username, email: player.email},
            token: token,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({error:"Server error."});
    }
});
// logs user out
app.post("/api/logout",(req,res) => {
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
// and an array containing the stat names, and stat values to be updated
/*
app.post("/api/leaderboard/update", (req,res) => {

    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).json({message: 'missing or invalid token'});
    }

    try{
        const body = jwt.verify(authArr[1],process.env.JWT_SECRET);
        const username = body.username;
        const gameName = body.gameName;
        const stats = body.stats;
        if(!username || !gameName|| !stats) {
            return res.status(409).json({error: "missing username gameName, or game stats"});
        }
        const player = await Player.findOne({username});
        if(!player) {
            return res.status(409).json({
                error: "Invalid body data.",
            });
        }
        gameStats = await player.gameResults.findOne("gameName");

    } catch(err) {
        return res.status(401).json({message: "Invalid or expired token"});
    }
});
*/
//retreives leader board information for user or everyone

app.use((req,res) => {
    return res.status(404).json({
        error: "Route not found.",
    });
});

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});
