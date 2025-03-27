import { Blog } from "../models/BlogModel.js";

// Create Blog
export const createBlog = async (req, res) => {
    try {
        const { title, description, imgUrl } = req.body;

        if (!title || !description || !imgUrl) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const blog = await Blog.create({
            title,
            description,
            imgUrl,
            user: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Blog added successfully",
            blog,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Get My Blogs
export const MyBlog = async (req, res) => {
    try {
        const userId = req.user._id;
        const blogs = await Blog.find({ user: userId });

        return res.status(200).json({
            success: true,
            blogs,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Update Blog
export const UpdateBlog = async (req, res) => {
    try {
        const { title, description, imgUrl } = req.body;
        const id = req.params.id;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Invalid Blog ID",
            });
        }

        // Check if the logged-in user owns the blog
        if (blog.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized! You cannot update this blog",
            });
        }

        blog.title = title;
        blog.description = description;
        blog.imgUrl = imgUrl;
        await blog.save();

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Delete Blog
export const deleteMyBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Invalid Blog ID",
            });
        }

        // Check if the logged-in user owns the blog
        if (blog.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized! You cannot delete this blog",
            });
        }

        await blog.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Get All Blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();

        return res.status(200).json({
            success: true,
            message: "All blogs fetched successfully",
            blogs,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Get Blog by ID
export const getBlogByID = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Invalid Blog ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
