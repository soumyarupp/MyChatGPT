import mongoose from "mongoose";
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
        let {chatId} = req.params;
        const {content,model} = req.body;

        //Validate message content
        if(!content || content.trim() === ""){
            return res.status(400).json({
                message: "You didn't send any message"
            });
        }

        //Existing chat case
        if(!chatId){
            const newChat = await Chat.create({
                userId: req.varifyUser._id,
                model
            });
            chatId = newChat._id;
        }

        // validate chatId
        if(!mongoose.Types.ObjectId.isValid(chatId)){
                return res.status(400).json({
                    message: "Invalid chat id"
                })
        }
        
    

        // verfiy that chatID belongs to the particular user
        const chat = await Chat.findOne({_id: chatId, userId: req.varifyUser._id});

        if(!chat){
            return res.status(404).json({
                message: "invalid chatId"
            })
        }

        // create user message in database
        await Massage.create({
            chatId: chatId,
            userId: req.varifyUser._id,
            role: "user",
            contain: content.trim()
        });

        // sent this message to model..
        const modelAns = "AI Reply";

        // store model ans in database

        await Massage.create({
            chatId: chatId,
            userId: req.varifyUser._id,
            role: "assistant",
            contain: modelAns.trim()
        });

        //reply sent to user
        res.status(200).json({
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