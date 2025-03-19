import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {createBlog,MyBlog,UpdateBlog,deleteMyBlog} from '../controllers/blogController.js'

const Router=express.Router();
Router.get('/',(req,res)=>{
    res.status(200).json({message:"Blog page"})
})

Router.post('/new',isAuthenticated,createBlog)
Router.get('/myBlog',isAuthenticated,MyBlog)
Router.put('/:id',isAuthenticated,UpdateBlog)
Router.delete('/:id',isAuthenticated,deleteMyBlog)

export default Router;