import openrouter from "../config/openRouter.js";

const generateAIResponse = async (model, message) => {

    const completion = await openrouter.chat.send({
        chatRequest: {
            model,
            messages
        },
    });

    const aiReply = completion.choices[0]?.message.content;
    if(!aiReply){
        throw new Error("AI Reply is Empty!");
    }

    const promptTokens = completion.usage?.promptTokens || 0;
    const completionTokens = completion.usage?.completionTokens || 0;

    return {
        aiReply,
        usage: {
            promptTokens,
            completionTokens,
            totalTokens = promptTokens + completionTokens
        }    
    }
}

export default generateAIResponse;