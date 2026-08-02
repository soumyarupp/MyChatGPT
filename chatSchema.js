import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    topic: {
        type: String,
        required: true,
        trim: true,
        default: "New Chat"
    },
    model: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        default: ""
    },
    summaryUpdatedAt: {
        type: Date,
        default: null
    },
    summarizedTillMessageNumber: {
        type: Number,
        default: 0
    },
    messageCount: {
        type: Number,
        default: 0
    },
},{timestamps: true});

const Chat = mongoose.model("chatinfo",chatSchema);
export default Chat;