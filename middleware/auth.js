import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        // 1️⃣ Debugging: Log the received cookies
        console.log("🔍 Cookies received in request:", JSON.stringify(req.cookies, null, 2));

        // 2️⃣ Ensure req.cookies exists and contains token
        if (!req.cookies || !req.cookies.token) {
            console.log("🚨 No token found in cookies!");
            return res.status(401).json({
                success: false,
                message: "Please login",
            });
        }

        const { token } = req.cookies;

        // 3️⃣ Debugging: Log the token being verified
        console.log("🔑 Token being verified:", token);

        // 4️⃣ Verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decode);

        // 5️⃣ Fetch the user from DB
        req.user = await User.findById(decode._id);
        console.log("👤 User found:", req.user);

        // 6️⃣ If user does not exist, return error
        if (!req.user) {
            console.log("🚨 No user found with this token!");
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }

        // 7️⃣ Proceed to the next middleware
        next();
    } catch (error) {
        console.log("🚨 JWT Verification failed:", error.message);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};
