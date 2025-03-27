import jwt from "jsonwebtoken"

export const generateCookie = (user,res,statusCode=200,message)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    // const token = jwt.sign({user},'!@#$%^&*()')
  
    console.log("Generated Token:", token);


    res.status(201)
    .cookie("token", token, {
         httpOnly: true,
         secure: true,   // ✅ Required for SameSite=None (Must be on HTTPS)
         sameSite: "None",
         path: "/",           // Ensure it's accessible on all routes
         domain: "https://blogging-website-mern-e4ai.onrender.com",  // ✅ Allows cross-origin cookies
         maxAge: 24* 10 * 60 * 1000  // 10 minutes
    })
    .json({
         success: true,
         message: "Login successful",
    });
 

    
}