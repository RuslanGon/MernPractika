import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import startServer from "./db.js";
import cookieParser from "cookie-parser";
import { authRouter } from './routes/auth.js'
import { camperRouter } from "./routes/campers.js";
import multer from 'multer'


const app = express();
dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/uploads', express.static('uploads'));

app.use("/auth", authRouter);
app.use('/campers', camperRouter)



startServer(app);