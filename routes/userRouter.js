import express from "express";
import userProfile from "../controllers/userProfile.js";
import { profile, signUp, login, logOut } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/userprofile",userProfile);
userRouter.get("/profile",profile);
userRouter.post("/signup",signUp);
userRouter.get("/login",login);
userRouter.get("/logout",logOut);
// ....


export default userRouter;
