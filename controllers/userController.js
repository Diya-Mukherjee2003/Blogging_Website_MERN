import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {User} from '../models/UserModel.js'
import {generateCookie} from '../utility/feature.js'

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
    generateCookie(user,res,201,"User register successfully!")
    console.log("Response Headers:", res.getHeaders());
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
    generateCookie(user,res,201,`Welcome back ${user.name}`)
    console.log("Response Headers:", res.getHeaders());
    
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
export const getUserbyID=async(req,res)=>{
    const id=req.params.id;
    const user= await User.findById(id);
    if(!user){
        return res.status(404).json({
                success:false,
                message:"Invalid ID"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"Here is the user",
            user
        })
}