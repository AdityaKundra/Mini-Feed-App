import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { Comment } from "../models/Comment";
import { Types } from "mongoose";
import { Post } from "../models/Post";

export const addComment = async (
    req: AuthRequest,
    res:Response,
    next:NextFunction
)=> {
    try{
        const postId = req.params.id as string;
        const { text } = req.body;

        if(!Types.ObjectId.isValid(postId)){
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        if(!text?.trim()){
            return res.status(400).json({message: "Empty Comment"})
        }

        const post = await Post.findById(postId);

        if(!post){
            return res.status(400).json({message: "Invalid Post"})
        }

        await Comment.create({
            postId: postId,
            author: req.userId!,
            text
        });

        return res.status(201).json({
            message: "Comment added successfully"
        }); 

    }catch(err){
        next(err);
    }
}

export const getComments = async (
    req: Request,
    res:Response,
    next:NextFunction
)=> {
    try{
       
        const postId = req.params.id as string;

        if(!Types.ObjectId.isValid(postId)){
            return res.status(400).json({ message: "Invalid Post ID" });
        }
        
        const comments = await Comment.find({postId: postId})
        .sort({createdAt: -1})
        .populate('author','name');
        
        return res.status(200).json(comments);

    }catch(err){
        next(err);
    }
}

export const editComment = async (
    req: AuthRequest,
    res:Response,
    next:NextFunction
)=> {
    try{

        const commentId = req.params.id as string;
        const { text } = req.body;
        
        if(!Types.ObjectId.isValid(commentId)){
            return res.status(400).json({ message: "Invalid Comment ID" });
        }
        if(!text?.trim()){
            return res.status(400).json({message: "Empty Comment"})
        }

        const comment = await Comment.findById(commentId);

        if(!comment){
            return res.status(404).json({ message: "Comment not found" });
        }

        if(comment.author.toString() !== req.userId){
            return res.status(403).json({ message: "Unauthorized to edit this comment" });
        }

        comment.text = text;
        await comment.save();

        return res.status(200).json({
            message: "Comment updated successfully"
        });

    }catch(err){
        next(err);
    }
}

export const deleteComment = async (
    req: AuthRequest,
    res:Response,
    next:NextFunction
)=> {
    try{

        const commentId = req.params.id as string;
        
        if(!Types.ObjectId.isValid(commentId)){
            return res.status(400).json({ message: "Invalid Comment ID" });
        }
        
        const comment = await Comment.findById(commentId);

        if(!comment){
            return res.status(404).json({ message: "Comment not found" });
        }

        if(comment.author.toString() !== req.userId){
            return res.status(403).json({ message: "Unauthorized to delete this comment" });
        }

        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({
            message: "Comment deleted successfully"
        });

    }catch(err){
        next(err);
    }
}
