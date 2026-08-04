import express from "express";
import userProfile from "../controllers/userProfile.js";
import { profile, signUp, logIn, logOut } from "../controllers/userController.js";
import authUserMiddleware from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.get("/userprofile",userProfile);
userRouter.get("/profile",authUserMiddleware,profile);
userRouter.post("/signup",signUp);
userRouter.get("/login",logIn);
userRouter.get("/logout",logOut);
// ....


export default userRouter;
