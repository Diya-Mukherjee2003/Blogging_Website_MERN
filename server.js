import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/user.js";
import blogRouter from "./Routes/blog.js";
import { config } from "dotenv";
import cors from "cors";

// 🔹 Load environment variables FIRST
config({
    path: "./Data/config.env",
});

const app = express();

app.use(express.json());
app.use(cookieParser());

// 🔹 Ensure CORS is properly configured
app.use(
    cors({
        origin: process.env.FRONTEND_URL,  
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true, 
        allowedHeaders: ["Content-Type", "Authorization"], 
    })
);


// 🔹 Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        dbName: "MERN_2023_YouTube",
    })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// 🔹 Define Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// 🔹 Start Server
app.listen(process.env.PORT, () =>
    console.log(`Server is running on port number ${process.env.PORT}`)
);
