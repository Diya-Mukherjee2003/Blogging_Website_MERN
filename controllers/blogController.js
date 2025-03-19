import { Blog } from "../models/BlogModel.js";
export const createBlog= async(req,res)=>{
    const {title,description,imgUrl} =req.body
    /*const blog = */
    await Blog.create({title,description,imgUrl,user:req.user})
    return res.status(200).json({
        success:true,
        message:"Blog added succesfully",
        // blog
    })
    
}
export const MyBlog= async(req,res)=>{
    const userId= req.user._id;
    const blog=await Blog.find({user:userId});
    return res.status(200).json({
        success:true,
        blog
    })
}
export const UpdateBlog=async(req,res)=>{
    const {title,description,imgUrl}=req.body
    const id=req.params.id;
    const blog= await Blog.findById(id);
    if(!blog){
        return res.status(404).json({
            success:false,
            message:"Invalid ID"
        })
    }
    blog.title=title
    blog.description=description
    blog.imgUrl=imgUrl
    blog.save()

    return res.status(200).json({
        success:true,
        message:"updating blog",
        blog
    })
}
export const deleteMyBlog=async(req,res)=>{
    const id=req.params.id;
    const blog= await Blog.findById(id);
    if(!blog){
        return res.status(404).json({
            success:false,
            message:"Invalid ID"
        })
    }
    
    await blog.deleteOne()
    
    return res.status(200).json({
        success:true,
        message:"Blog deleted",
       
    })
}
export const getAllBlogs=async(req,res)=>{
    const blogs= await Blog.find();
    if(!blogs){
        return res.status(404).json({
            success:false,
            message:"No blogs added yet"
        })
    }
    return res.status(200).json({
        success:true,
        message:"All blogs",
        blogs
    })
}
export const getBlogbyID=async(req,res)=>{
    const id=req.params.id;
    const blog= await Blog.findById(id);
    if(!blog){
        return res.status(404).json({
            success:false,
            message:"Invalid ID"
        })
    }
    
    return res.status(200).json({
        success:true,
        message:"Here is the Blog",
        blog
    })
}