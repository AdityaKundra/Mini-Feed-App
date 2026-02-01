import { useState, useEffect, useCallback } from "react";
import { getPostById } from "@/api/post";
import { handleLike as handleLikeApi } from "@/api/like";
import { addComment as addCommentApi } from "@/api/comment";
import { extractErrorMessage } from '@/utils/errorUtils';


export interface Comment {
    _id: string;
    text: string;
    author: {
        _id: string;
        name: string;
    };
    createdAt: string;
}

export interface PostDetail {
    id: string
    title: string
    description: string
    author: {
        _id: string
        name: string
    },
    likesCount: number,
    likes: Array<{
        _id: string,
        name: string,
    }>,
    commentsCount: number,
    comments: Comment[],
    createdAt: string,
    isLikedByCurrentUser: boolean
}

export const usePost = (postId: string | undefined) => {
    const [post, setPost] = useState<PostDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const fetchPost = useCallback(async () => {
        if (!postId) return;

        try {
            setLoading(true)
            setError(null)

            const data = await getPostById(postId);
            setPost(data);
        } catch (err: any) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
        } finally {
            setLoading(false)
        }
    }, [postId])

    const toogleLikes = useCallback(async (postId: string) => {
        if (!postId || !post) return;

        const previousState = {
            isLikedByCurrentUser: post.isLikedByCurrentUser,
            likesCount: post.likesCount
        };

        try {
            // Optimistic update
            setPost(prev => prev ? {
                ...prev,
                isLikedByCurrentUser: !prev.isLikedByCurrentUser,
                likesCount: prev.isLikedByCurrentUser ?
                    prev.likesCount - 1
                    : prev.likesCount + 1
            } : null)

            await handleLikeApi(postId);

            // Success - no need to refresh, optimistic update is correct

        } catch (error: any) {
            // Rollback on error
            setPost(prev => prev ? {
                ...prev,
                isLikedByCurrentUser: previousState.isLikedByCurrentUser,
                likesCount: previousState.likesCount
            } : null)
        }
    }, [postId, post])

    const addComment = useCallback(async (comment: string) => {

        if (!postId) return;
        try {
            await addCommentApi(postId, comment);
            await fetchPost();
        } catch (err: any) {
            // Comment add error handled silently
        }
    }, [post, fetchPost]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return {
        post,
        loading,
        error,
        addComment,
        toogleLikes,
        fetchPost
    }
}