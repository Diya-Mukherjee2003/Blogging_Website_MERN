export const isAuthenticated = async (req, res, next) => {
    console.log("Cookies:", req.cookies);
    const { token } = req.cookies;
    console.log("Extracted Token:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login",
        });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode._id);

        if (!req.user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
