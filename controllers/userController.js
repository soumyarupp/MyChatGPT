import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";


const createToken = async (id,email) => {
    if(!process.env.JWT_SECRET){
        throw new Error("JWT Secret key is Missing");
    }
    const token = jwt.sign({_id: id, email: email},process.env.JWT_SECRET,{expiresIn: "1h"});

    return token;
}

const cookiesOption = {
    httpOnly: true,
    secure: false,
    maxAge: 60*60*1000
}

const profile = async (req,res) => {
    res.send("User Profile Page");
}
const signUp = async (req,res) => {
    try {
        const {name,age,email,password} = req.body;
        console.log(name);
        
        if(!name || !age || !email || !password){
            res.status(400).json({
                message: "Some filed are missing!"
            });
            return;
        }

        console.log(name);

        const userExist = await User.findOne({email: email});
        if(userExist){
            console.log(userExist);
            
            res.status(409).json({
                message: "User already exists!"
            });
            return;
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newUser = User.create({
            name: name,
            age: age,
            email: email,
            password: hashPassword
        });


        const token = await createToken(newUser._id,email);
        res.cookie("token",token,cookiesOption)
        console.log(token);
        

        res.status(201).json({
            message: "User Created SuccessFully",
            user: {
                name: name,
                age: age,
                email: email
            }
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Intarnal Server Error!"
        })
        
    }

}

const login = async (req,res) => {
    res.send("Login page");
}
const logOut = async (req,res) => {
    res.send("LogOut page");
}

export {profile,signUp,login,logOut}