import Chat from "../model/chatSchema.js";
import Massage from "../model/messageSchema.js";
import User from "../model/userSchema.js";


const recentChat = async (req,res) => {
    try {
        const userChat = await Chat.find({userId: req.varifyUser._id}).select("topic updatedAt").sort({updatedAt: -1}).limit(20);

        res.status(200).json({
            message: "Your all recent chats",
            Chats: userChat
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
    
}
const createChat = async (req,res) => {
    try {
        const {model,topic} = req.body;
        if(!model){
            return res.status(400).json({
                messages: "Model name is missing"
            })
        }

        // limited model accese
        // const user = Chat.findOne({userId: req.varifyUser._id, model: model});
        // if(!user){
        //     return res.status(400).json({
        //         messages: "Invalid Model!"
        //     });
        // }

        // const userTopic = "SIH 2026";
        const createChat = await Chat.create({userId: req.varifyUser._id, model: model, topic});

        res.status(201).json({
            chatId: createChat._id,
            userId: req.varifyUser._id,
            model,
            topic: createChat.topic,
            createdAt: createChat.createdAt
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}
const singleChat = async (req,res) => {
    try {
        const {chatId} = req.params;
        if(!chatId){
            return res.status(400).json({
            message: "Please Input chat id"
            });
        }

        const userChat = await Chat.findOne({_id: chatId, userId: req.varifyUser._id});

        if(!userChat){
            return res.status(404).json({
            message: "Chat not found!"
            });
        }

        res.status(200).json({
            message: "Your Chat",
            Chat: {
                Id: userChat._id,
                userId: userChat.userId,
                topic: userChat.topic
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }

}
const deleteChat = async (req,res) => {
    try {
        const {chatId} = req.params;

        if(!chatId){
            return res.status(400).json({
            message: "Please Input chat id"
            });
        }

        const userChat = await Chat.findOne({_id: chatId, userId: req.varifyUser._id});

        if(!userChat){
            return res.status(404).json({
            message: "Chat not found!"
            });
        }

        await Massage.deleteMany({chatId: userChat._id});
        await Chat.deleteOne({_id: userChat._id});

        res.status(200).json({
            message: "Chat Delete successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

export {recentChat,createChat,singleChat,deleteChat}
