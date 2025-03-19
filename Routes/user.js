import express from "express";
import { userRegister,userLogin ,Logout,getMyProfile} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const Router=express.Router()
Router.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"We are in home route",
        suman:"Web dev Mastery"
    })
})

Router.post('/register',userRegister)
Router.post('/login',userLogin)
Router.get('/logout',Logout)
Router.get('/myprofile',isAuthenticated,getMyProfile)

export default Router;