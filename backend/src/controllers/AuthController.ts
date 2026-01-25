import { Request, Response, NextFunction } from "express";
import { User } from '../models/User';
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { comparePassword, hashPassword } from '../utils/hash'

export const registerUser = async (
    req: Request, 
    res: Response,
    next: NextFunction
)=>{
    try{

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        // Convert Password to Hash
        const hashedPassword = await hashPassword(password);

        // Create User
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken({ userId: newUser._id.toString() });

        return res.status(201).json({ 
            message: "User registered successfully", 
            token 
        });

    }catch(err){
        next(err);
    }
} 

export const loginUser = async (
    req: Request, 
    res: Response,
    next: NextFunction
)=>{
    try{

        const { email, password } = req.body;

        if (!email?.trim()) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({ message: "User does not exist" });
        }

        // Compare Password

        const passwordCheck = await comparePassword(password, existingUser.password);

        if(!passwordCheck){
            return  res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken({ userId: existingUser._id.toString() });

        return res.status(200).json({ 
            message: "User logged in successfully", 
            token 
        });

    }catch(err){
         next(err);
    }
} 
