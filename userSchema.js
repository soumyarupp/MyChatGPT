import mongoose from "mongoose";
import { timeStamp } from "node:console";

const userInfo = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 30,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        min: 6,
        max: 100,
        required: true
    },
    email: {
        type: String,
        minLength: 3,
        maxLength: 30,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    usage: {
        tokenUsed: {
            type: Number,
            default: 0
        },
        resetAt: {
            type: Date,
            default: () => new Date(Date.now() + 5 * 60 * 60 * 1000)
        },
        totalTokenUsed: {
            type: Number,
            default: 0
        }
    }
},{timestamps: true});

const User = mongoose.model("user_info",userInfo)
export default User;