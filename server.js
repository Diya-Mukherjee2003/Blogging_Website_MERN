import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import userRouter from './Routes/user.js'
import blogRouter from './Routes/blog.js'
import { config } from 'dotenv'
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cookieParser());

console.log("Allowed Frontend URL:", process.env.FRONTEND_URL); // Debugging

app.use(cors({
    origin: process.env.FRONTEND_URL.split(','),  // Ensure array if multiple origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

config({
    path: './data/config.env'
})

mongoose.connect(process.env.MONGO_URL, {
    dbName: "MERN_2023_YouTube"
}).then(() => console.log("MongoDB is Connected!"))

// userRouter
app.use('/api/users', userRouter)

// blogRouter
app.use('/api/blogs', blogRouter)

// Debugging Response Headers
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log("Response Headers:", res.getHeaders());
    });
    next();
});

app.listen(process.env.PORT, () => console.log(`Server is running on Port ${process.env.PORT}`))
