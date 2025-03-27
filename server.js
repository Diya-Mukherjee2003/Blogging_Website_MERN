import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './Routes/user.js';
import blogRouter from './Routes/blog.js';
import cors from 'cors';
import { config } from 'dotenv';

// Load environment variables
config({ path: './data/config.env' });

const app = express();

// Debugging: Ensure environment variables are loaded correctly
console.log("Loaded FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("Loaded PORT:", process.env.PORT);
console.log("Loaded MONGO_URL:", process.env.MONGO_URL ? "Present ✅" : "Missing ❌");

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,  // Ensure array if multiple origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    dbName: "MERN_2023_YouTube"
}).then(() => console.log("✅ MongoDB is Connected!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

// Debugging: Log response headers for each request
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log("Response Headers:", res.getHeaders());
    });
    next();
});

// Start server
app.listen(process.env.PORT, () => console.log(`🚀 Server is running on Port ${process.env.PORT}`));
