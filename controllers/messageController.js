import Chat from "../model/chatSchema.js";
import Massage from "../model/messageSchema.js";

const getMessage = async (req,res) => {
    try {
        const {chatId} = req.params;
        const chat = await Chat.findOne({_id: chatId, userId: req.varifyUser._id});

        if(!chat){
            return res.status(404).json({
                messages: "Chat Not found"
            });
        }

        const messages = await Massage.find({chatId: chatId}).select("role contain").sort({createdAt: 1});

        res.status(200).json({
            messages: "Your are all messages are here",
            msg: messages
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messages: "Internal server error"
        });
    }
}

const sendMessage = async (req,res) => {
    try {
        const {chatId} = req.params;
        const {content} = req.body;

        if(!content || content.trim() === ""){
            return res.status(400).json({
                message: "You didn't send any message"
            });
        }

        // verfiy that chatID belongs to the particular user
        const chat = await Chat.findOne({_id: chatId, userId: req.varifyUser._id});

        if(!chat){
            return req.status(404).json({
                message: "invalid chatId"
            })
        }

        // create user message in database
        await Massage.create({
            chatId: chatId,
            userId: req.varifyUser._id,
            role: "user",
            contain: content
        });

        // sent this message to model..
        const modelAns = "hello";

        // store model ans in database

        await Massage.create({
            chatId: chatId,
            userId: req.varifyUser._id,
            role: "assistant",
            contain: modelAns
        });

        //reply sent to user
        res.status(201).json({
            message: modelAns
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messages: "Internal server error"
        });
    }
}

export {getMessage,sendMessage}