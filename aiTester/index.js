import { OpenRouter } from '@openrouter/sdk';
import 'dotenv/config';
import readlineSync from "readline-sync";

const client = new OpenRouter({
    apiKey: process.env.API_KEY
});

const history = [];

const chatbot = async (question) => {
    const completion = await client.chat.send({
        chatRequest: {
            model: '~openai/gpt-latest',
            messages: [
                ...history,
                {
                    role: 'user',
                    content: question,
                },
            ],
        }
    });

    history.push(
        {
            role: 'user',
            content: question,
        }
    );
    history.push(
        {
            role: 'assistant',
            content: completion.choices[0].message.content,
        }
    );

    console.log(completion.choices[0].message.content);
}
while (true) {
    const userQuestion = readlineSync.question("Ask: ");
    await chatbot(userQuestion);
}
