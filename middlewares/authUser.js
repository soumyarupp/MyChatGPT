import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

const authUserMiddleware = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        
        // token are not given
        if(!token){
            res.status(404).json({
                message: "please login or signup"
            })
            return;
        }

        let payload;
        try {
            payload = await jwt.verify(token,process.env.JWT_SECRET);

        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
       
        
        // // token are not valid
        // if(!payload){
        //     res.status(404).json({
        //         message: "User Doesnt Exist"
        //     })
        //     return;
        // }
        const existingUser = await User.findOne({email: payload.email});

        // i create another object field inside res object,
        req.varifyUser = existingUser;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export default authUserMiddleware;