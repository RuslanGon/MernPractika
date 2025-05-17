import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import startServer from "./db.js";


const app = express();
dotenv.config();
app.use(cors())
app.use(express.json())

startServer(app);