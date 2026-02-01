import { Request, Response, NextFunction } from "express";
import { User } from '../models/User';
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

        // Return user details without password
        const userDetails = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt
        };

        return res.status(201).json({ 
            message: "User registered successfully", 
            token,
            user: userDetails
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

        // Return user details without password
        const userDetails = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            createdAt: existingUser.createdAt
        };

console.log('userDetails', userDetails);
        return res.status(200).json({ 
            message: "User logged in successfully", 
            token,
            user: userDetails
        });

    }catch(err){
         next(err);
    }
}

export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.id as string;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        });

    } catch (err) {
        next(err);
    }
}
