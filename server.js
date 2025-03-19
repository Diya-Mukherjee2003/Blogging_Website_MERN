import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import userRouter from './Routes/user.js'
import blogRouter from './Routes/blog.js'
import { config } from "dotenv"
import cors from 'cors'

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))

config({
    path:'./Data/config.env'
})

mongoose.connect(process.env.MONGO_URL
    ,{
        dbName:"MERN_2023_YouTube"
    }
).then(()=>console.log("MongoDB is connected"))

//MVC= model view controllers
app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)

app.listen(process.env.PORT,()=>console.log(`Server is running on port number ${process.env.PORT}`))

