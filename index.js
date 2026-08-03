import express from "express";
import connectDB from "./config/mdDatabase.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";


dotenv.config();
// console.log(process.env.PORT);

const app = express();
app.use(express.json());

app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.send("Hello World");
})


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