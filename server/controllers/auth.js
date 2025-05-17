import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";      
import UsertModel from "../models/User.js";

dotenv.config();  

export const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const user = await UsertModel.findOne({ name });
    if (user) {
      return res.status(409).json({ message: "User is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UsertModel({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ registered: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await UsertModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,     
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
    try {
      const users = await UsertModel.find({}, { password: 0 });
      return res.status(200).json({ users, message: 'get all users' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };

export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedUser = await UsertModel.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ message: "User deleted", user: deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
