import express from "express";
import authUserMiddleware from "../middlewares/authUser.js";
import { recentChat, createChat, singleChat, deleteChat } from "../controllers/chatController.js";

const chatRouter = express.Router();
chatRouter.use(authUserMiddleware);

// getRecentChat: top 20 , getSingleChat , createChat, deleteChat
chatRouter.get("/getRecentChat",recentChat);
chatRouter.post("/createChat",createChat);
chatRouter.get(":chatId",singleChat);
chatRouter.delete(":chatId",deleteChat);

export default chatRouter;