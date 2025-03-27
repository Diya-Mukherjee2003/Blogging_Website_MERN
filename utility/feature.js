import jwt from "jsonwebtoken";

export const generatecookie = (user, res, statusCode = 200, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Generated Token:", token);

    res.status(statusCode)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,  // 10 minutes
        sameSite: "None",  // Required for cross-origin cookies
        secure: true,  // Required for SameSite=None (must be https)
        domain: ".onrender.com"  // Change to match backend deployment domain
      })
      .json({
        success: true,
        message
      });
};
