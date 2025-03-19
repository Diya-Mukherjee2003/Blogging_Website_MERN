import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {User} from '../models/UserModel.js'
import { generatecookie } from "../utility/feature.js"

export const userRegister=async(req,res)=>{
    const {name,email,password}=req.body

    let user= await User.findOne({email})
    if (user){
        return res.status(404).json({
            success:false,
            message:"Email Already exists"
        })
    }
    const hashPassword=await bcrypt.hash(password,10)
    user=await User.create({
        name,
        email,
        password:hashPassword
    })
    generatecookie(user,res,201,"User register successfully!")
}

export const userLogin=async(req,res)=>{
    const {email,password}=req.body

    let user= await User.findOne({email})

    if(!user) return res.status(400).json({
        success:false,
        message:"User not exist"
    })

    const isMatch= await bcrypt.compare(password,user.password)
    
    if(!isMatch) return res.status(400).json({
        success:false,
        message:"Invalid credential"
    })
    generatecookie(user,res,201,`Welcome back ${user.name}`)
    
}
export const Logout=(req,res)=>{
    res.status(200).cookie("token",{
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Logged out successfully"
    })
    console.log("Logged out successfully")
}
export const getMyProfile=(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
}