import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import startServer from "./db.js";
import cookieParser from "cookie-parser";
import { authRouter } from './routes/auth.js'


const app = express();
dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/auth", authRouter);

startServer(app);