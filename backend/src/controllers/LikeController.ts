import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { Post } from "../models/Post";
import { Types } from "mongoose";

export const handleLike = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
)=>{
    try{

        const postId = req.params.id as string;

        if(!Types.ObjectId.isValid(postId)){
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        const post = await Post.findById(postId);

        if(!post){
            return res.status(400).json({ message: "Post not Found" });
        } 

        const likedAlready = post.likes.some(id=>id.toString() === req.userId);
        
        if(likedAlready){
            post.set('likes', post.likes.filter((userId) => userId.toString() !== req.userId));
        }else{
            post.likes.push(new Types.ObjectId(req.userId!));
        }

        await post.save();

        return res.status(200).json({
            message: likedAlready ? "Like removed" : "Post liked",
            likesCount: post.likes.length
        });

    }catch(err){
        next(err);
    }
}