require("dotenv.config")
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bycryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT;

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
        unique: true
    },
    value: {type: Number}
})

const gameStats = new mongoose.Schema({
    gameName: {
        type: String,
        minLength: 1,
        trim: true,
        unique: true,
    },
    stats: [stat]
})

const userSchema = new mongoose.Schema({
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
        trim: true
      },
      password: {
        type: String,
        require: true,
        minLength: 32,
      },
      gameResults: [gameStats]
});
