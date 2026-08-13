import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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
    }

},{timestamps: true});

messageSchema.index({ chatId: 1, createdAt: 1 });
messageSchema.index({ userId: 1, createdAt: -1 });


const Massage = mongoose.model("massage",messageSchema);
export default Massage;