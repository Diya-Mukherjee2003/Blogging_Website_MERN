export const isAuthenticated = async (req, res, next) => {
    console.log("Cookies received:", req.cookies); // Print cookies in console

    if (!req.cookies) {
        console.log("req.cookies is undefined");
    }

    const { token } = req.cookies || {}; // Prevent errors if undefined

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Please login",
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode._id);
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};
