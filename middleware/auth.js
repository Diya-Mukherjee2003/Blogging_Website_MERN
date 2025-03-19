import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

export const isAuthenticated=async (req,res,next)=>{
    const {token} = req.cookies
    console.log(token)
    console.log("Got token")
    if(!token) return res.status(404).json({
        success:false,
        message:"Please login"
    })
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decode._id)
    // console.log(req.user)
    // res.status(200).json({message:"My Profile",user:req.user})
    next()
}