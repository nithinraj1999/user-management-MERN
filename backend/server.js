import express from 'express'
import dotenv from 'dotenv'
import { notFound,errorHandler } from '../middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const port = process.env.PORT  || 3000
import userRoutes from './routes/userRoutes.js'
import adminRoute from './routes/adminRoute.js'

const app = express();
connectDB()
  
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())


app.use("/api",userRoutes)
app.use("/api/admin",adminRoute)



app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`server startedon port ${port}`))