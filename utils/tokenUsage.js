const addChatTokenUsage = async (chat,usage) => {
    chat.usage.promptTokens += usage.promptTokens;
    chat.usage.completionTokens += usage.completionTokens;
    chat.usage.totalTokens += usage.totalTokens;

    chat.save();
}
export default addChatTokenUsage;