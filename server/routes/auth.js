import express from "express";
import { deleteUser, getAllUsers, login, register } from "../controllers/auth.js";


const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get( "/users", getAllUsers); 
router.delete("/user/:id", deleteUser);

export { router as authRouter };