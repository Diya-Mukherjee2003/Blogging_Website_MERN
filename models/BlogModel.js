import mongoose from "mongoose"

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        // unique:true,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", //This is for the userSchema
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Blog=mongoose.model("Blog",BlogSchema)