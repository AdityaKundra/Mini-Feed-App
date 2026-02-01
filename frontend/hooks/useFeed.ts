import { useState, useEffect, useCallback, useMemo } from "react";
import { getFeed } from "@/api/post";
import { handleLike } from "@/api/like";
import { extractErrorMessage } from '@/utils/errorUtils';

export interface Post {
    id: string,
    author: {
        _id: string,
        name: string,
    },
    title: string,
    description: string,
    likesCount: number,
    likes: Array<{
        _id: string,
        name: string,
    }>,
    commentsCount: number,
    createdAt: string,
    isLikedByCurrentUser: boolean,
}

export interface FeedResponse {
    posts: Post[]
    page: number
    limit: number

}

export const useFeed = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loadMore, setLoadMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [Refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1);
    const [morePost, setMorePost] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const limit = 10;

    const fetchFeed = useCallback(async (pageNumber: number, isLoadMore = false) => {

        try {
            if (isLoadMore)
                setLoadMore(true);
            else
                setLoading(true);

            setError(null);

            const feedResponse: FeedResponse = await getFeed(pageNumber, limit);

            if (isLoadMore)
                setPosts(prev => [...prev, ...feedResponse.posts]);
            else
                setPosts(feedResponse.posts);

            setMorePost(feedResponse.posts.length === limit);
            setPage(pageNumber)

        } catch (err: any) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
        } finally {
            setLoading(false);
            setLoadMore(false);
            setRefreshing(false);
        }

    }, [limit])


    const loadMorePost = useCallback(() => {
        if (!loadMore && morePost && !loading) {
            fetchFeed(page + 1, true);
        }
    }, [loadMore,
        morePost,
        loading,
        page,
        fetchFeed]);

    const refresh = useCallback(() => {
        setRefreshing(true);
        setPage(1);
        setMorePost(true);
        fetchFeed(1, false);
    }, [fetchFeed]);

    const likedPostIds = useMemo(() =>
        posts.filter(post => post.isLikedByCurrentUser).map(post => post.id),
        [posts]);

    const toogleLikes = useCallback(async (postId: string) => {
        // Find the post at the time of the function call
        setPosts(currentPosts => {
            const currentPost = currentPosts.find(p => p.id === postId);
            if (!currentPost) return currentPosts;

            const previousState = {
                isLikedByCurrentUser: currentPost.isLikedByCurrentUser,
                likesCount: currentPost.likesCount
            };

            // Optimistic update
            const optimisticUpdate = currentPosts.map(post => post.id === postId ?
                {
                    ...post,
                    isLikedByCurrentUser: !post.isLikedByCurrentUser,
                    likesCount: post.isLikedByCurrentUser ?
                        post.likesCount - 1
                        : post.likesCount + 1
                } : post);

            // Perform the API call
            handleLike(postId).catch(error => {
                // Rollback on error
                setPosts(rollbackPosts => rollbackPosts.map(post => post.id === postId ?
                    {
                        ...post,
                        isLikedByCurrentUser: previousState.isLikedByCurrentUser,
                        likesCount: previousState.likesCount
                    } : post))
            });

            return optimisticUpdate;
        });
    }, []) // No dependencies needed since we use functional updates

    useEffect(() => {
        fetchFeed(1);
    }, [fetchFeed]);

    return {
        posts,
        loadMore,
        loading,
        Refreshing,
        morePost,
        error,
        loadMorePost,
        refresh,
        likedPostIds,
        toogleLikes
    }
}