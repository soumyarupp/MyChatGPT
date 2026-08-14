import generateAIResponse from "./openRouterService.js";
import Chat from "../model/chatSchema.js";
import Massage from "../model/messageSchema.js";
import User from "../model/userSchema.js";

const SUMMARY_CHUNK_SIZE = 20;

const updateSummaryIfNeeded = async (chatId) => {
    const chat = await Chat.findById(chatId);
    if (!chat) {
        return;
    }

    const unsummarizedCount = chat.messageCount - chat.summarizedTillMessageNumber;
    if (unsummarizedCount < SUMMARY_CHUNK_SIZE) {
        return;
    }

    const messagesToSummarize = await Massage.find({ chatId: chat._id }).sort({ createdAt: 1 }).skip(chat.summarizedTillMessageNumber).limit(SUMMARY_CHUNK_SIZE);

    const summaryMessages = [
        {
            role: "system",
            content: "Summarize the conversation. Keep important context, user goals, decisions, and unresolved doubts. Do not add extra information."
        },
        {
            role: "user",
            content: `Previous summary: ${chat.summary || "No previous summary yet."}`
        },
        ...messagesToSummarize,
        {
            role: "user",
            content: "Summarize the above conversation."
        }

    ]
    const {aiReply,usage} = await generateAIResponse(chat.model,summaryMessages);

    chat.summary = aiReply;
    chat.summaryUpdatedAt = new Date();
    chat.summarizedTillMessageNumber += summaryMessages.length;

    chat.usage.promptTokens += usage.promptTokens;
    chat.usage.completionTokens += usage.completionTokens;
    chat.usage.totalTokens += usage.totalTokens;

    await chat.save();

    const user = await User.findOne({_id: chat.userId});
    user.usage?.tokenUsed += usage.totalTokens;
    user.usage?.totalTokenUsed += usage.totalTokens;
    await user.save();
}

export default updateSummaryIfNeeded;