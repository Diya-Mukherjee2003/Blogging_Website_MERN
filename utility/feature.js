import jwt from "jsonwebtoken"

export const generateCookie = (user, res, statusCode = 200, message) => {
     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
 
     console.log("Generated Token:", token);
 
     res.status(statusCode)
         .cookie("token", token, {
             httpOnly: true,
             secure: true,  // ✅ Must be true for "None" to work
             sameSite: "None",  // ✅ Fix cross-site request issue
             path: "/",
             domain: process.env.NODE_ENV === "production" ? "blogging-website-mern-e4ai.onrender.com" : undefined,
             maxAge: 10 * 60 * 1000,
         })
         .json({
             success: true,
             message: message || "Login successful",
         });
 
     console.log("Response Headers Sent:", res.getHeaders());
 };
 