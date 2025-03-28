import jwt from "jsonwebtoken"

export const generateCookie = (user,res,statusCode=200,message)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    // const token = jwt.sign({user},'!@#$%^&*()')
  
    console.log("Generated Token:", token);


    res.status(statusCode)
    .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // ✅ Only secure in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/",      
        domain: process.env.NODE_ENV === "production" ? "blogging-website-mern-e4ai.onrender.com" : undefined,  // Remove domain for local testing
        maxAge: 10 * 60 * 1000  // 10 minutes
    })
    .json({
        success: true,
        message: message || "Login successful",
    });

}