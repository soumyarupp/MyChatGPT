import express from "express";
import 'dotenv/config';
import connectDB from "./config/mdDatabase.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";



// console.log(process.env.PORT);

const app = express();
app.use(express.json());
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/user",userRouter);
app.use("/chat",chatRouter);
app.use("/msg",messageRouter);





const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT,()=>{
            console.log(`Server is Started at port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
}

startServer();