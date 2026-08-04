import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


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
     try{
        res.status(200).json({
            message: "User Data",
            name: req.varifyUser.name,
            age: req.varifyUser.age,
            usage: req.varifyUser.usage,
            email: req.varifyUser.email
        })

    }
    catch(error){

        console.log(error);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
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

const logIn = async (req,res) => {
    try {
        const {email,password} = req.body;
        console.log(req.body);
        

        //checked email and password are fill or not
        if(!email || !password){
            res.status(400).json({
                message: "Some filed are missing!"
            });
            return;
        }

        // email is checked
        const userData = await User.findOne({email: email});
        if(!userData){
            res.status(401).json({
                message: "User not exist!"
            });
            return;
        }

        //password is checked
        const isTrue = await bcrypt.compare(password,userData.password);
        console.log(isTrue);
        
        if(!isTrue){
            res.status(401).json({
                message: "Wrong Password!"
            });
            return;
        }

        // JWT token create
        const token = await createToken(userData._id,email);
        res.cookie("token",token,cookiesOption);

        res.status(200).json({
            message: "User Login SuccessFully",
            user: {
                name: userData.name,
                age: userData.age,
                email: userData.email
            }
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Intarnal Server Error!"
        })
    }
}


const logOut = async (req,res) => {
    // logout
    res.clearCookie("token",{
        httpOnly: true,
        secure: false,
    });
    res.status(200).json({
        message: "User Logged Out Successfully"
    });
}

export {profile,signUp,logIn,logOut}