import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { Post } from '../models/Post'
import { Types } from "mongoose";
import { Comment } from "../models/Comment";

export const createPost = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    console.log(req.body);
    try {
        const { title, description } = req.body;

        const post = await Post.create({
            authorId: req.userId!,
            title: title.trim(),
            description: description.trim(),
        });

        res.status(201).json({
            message: "Post created successfully",
            post: {
                id: post._id,
                title: post.title,
                description: post.description,
            }
        });

    } catch (err) {
        console.log(err)
        next(err);
    }
}

export const getPost = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {

        const postId = req.params.id as string;
        const currentUserId = req.userId;

        if (!Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        const post = await Post.findById(postId)
            .populate('authorId', 'name')
            .populate({
                path: 'likes',
                select: 'name _id',
                model: 'User'
            });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comments = await Comment.find({ postId: postId })
            .populate('author', 'name');

        // Check if current user liked this post
        const isLikedByCurrentUser = currentUserId
            ? post.likes.some((like) => {
                // Handle both ObjectId and populated user object
                const likeId = typeof like === 'object' && like._id ? like._id.toString() : like.toString();
                return likeId === currentUserId;
              })
            : false;

        res.status(200).json({
            id: post._id,
            title: post.title,
            description: post.description,
            author: post.authorId,
            likesCount: post.likes.length,
            likes: post.likes,
            commentsCount: comments.length,
            comments,
            createdAt: post.createdAt,
            isLikedByCurrentUser
        });

    } catch (err) {
        next(err);
    }
}


export const updatePost = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const postId = req.params.id as string;
        const { title, description } = req.body;

        if (!Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid Post" })
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }

        if (post.authorId.toString() !== req.userId) {
            return res.status(403).json({ message: "Not Allowed to Edit Post" });
        }

        if (title !== undefined) post.title = title.trim();
        if (description !== undefined) post.description = description.trim();

        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post: {
                id: post._id,
                title: post.title,
                description: post.description,
            }
        });

    } catch (err) {
        next(err);
    }
}

export const deletePost = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {

        const postId = req.params.id as string;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }

        if (post.authorId.toString() !== req.userId) {
            return res.status(403).json({ message: "You're not allowed to delete this post" });
        }

        await post.deleteOne();

        return res.status(200).json({ message: "Post successfully deleted" });

    } catch (err) {
        next(err);
    }
}

export const getFeed = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = Math.max(1, parseInt(String(req.query.page)) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit)) || 10));
        const skip = (page - 1) * limit;
        const currentUserId = req.userId;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('authorId', 'name')
            .populate({
                path: 'likes',
                select: 'name _id',
                model: 'User'
            });

        const postIds = posts.map((p) => p._id);
        const commentCounts = await Comment.aggregate<{ _id: unknown; count: number }>([
            { $match: { postId: { $in: postIds } } },
            { $group: { _id: '$postId', count: { $sum: 1 } } }
        ]);
        const countMap = new Map(commentCounts.map((c) => [String(c._id), c.count]));

        const feed = posts.map((post) => {
            // Check if current user liked this post
            const isLikedByCurrentUser = currentUserId
                ? post.likes.some((like) => {
                    // Handle both ObjectId and populated user object
                    const likeId = typeof like === 'object' && like._id ? like._id.toString() : like.toString();
                    return likeId === currentUserId;
                  })
                : false;

            return {
                id: post._id,
                author: post.authorId,
                title: post.title,
                description: post.description,
                likesCount: post.likes.length,
                likes: post.likes,
                commentsCount: countMap.get(String(post._id)) ?? 0,
                isLikedByCurrentUser,
                createdAt: post.createdAt
            };
        });

        res.status(200).json({ posts: feed, page, limit });
    } catch (err) {
        next(err);
    }
}