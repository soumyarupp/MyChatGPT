import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import authUserMiddleware from "../middlewares/authUser.js";

const messageRouter = express.Router();
messageRouter.use(authUserMiddleware);

messageRouter.get("/:chatId",getMessage);
messageRouter.post("/:chatId",sendMessage);

export default messageRouter;