import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler"
import User from "../backend/models/userModels.js"

const protect = asyncHandler(async(req,res,next)=>{
    let token;

    token = req.cookies.jwt;
    if(token){
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET); 
            req.user = await User.findById(decode.userId).select("-password")
            next()
        }catch(error){
            res.status(401);
            throw new Error("Not authorised, invalid token")
        }
    }else{
        res.status(401);
        throw new Error("Not authorized, no token")
    }
}) 


export {protect} 

