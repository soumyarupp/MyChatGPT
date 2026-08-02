import mongoose from "mongoose";

const massageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["user","assistant"],
        required: true
    },
    contain: {
        type: String,
        required: true
    },
},{timestamps: true});

const Massage = mongoose.model("massage",massageSchema);
export default Massage;