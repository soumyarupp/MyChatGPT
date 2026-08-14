export const resetUsage = async (user) => {
    const now = new Date();
    if(now > user.usage.resetAt){
        user.usage.resetAt = new Date(Date.now() + 1000*60*60*5);
        user.usage.tokenUsed = 0;
        await user.save();
    }
}

export const hasTokenLimitReached = async (user) => {
    if(user.usage.totalTokenUsed > process.env.tokenLimit){
        return;
    }
}

export const addUserTokenUsage = async (user,totalTokens) => {
    user.usage.tokenUsed += totalTokens;
    user.usage.totalTokenUsed += totalTokens;
    await user.save();
}