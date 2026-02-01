import { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './ui/Text';
import { Card } from './ui/Card';
import { Post } from '@/hooks/useFeed';
import { Colors, Spacing } from '@/constants/theme';


interface PostCardProps {
    post: Post,
    onPress: (postId: string) => void
    onLike: (postId: string) => void
    // onComment?: (postId: string) => void
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onPress }) => {

    const handleLike = useCallback(() => {
        onLike(post.id)
    }, [onLike, post.id])

    // const handleComment = useCallback(()=>{
    //     onComment(post.id)
    // },[onComment, post.id])

    const handlePress = useCallback(() => {
        onPress(post.id)
    }, [onPress, post.id])


    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <Card
                username={post.author.name}
                createdAt={post.createdAt}
                content={post.description}
                commentCount={post.commentsCount}
                likesCount={post.likesCount}
                likes={post.likes}
                onLike={handleLike}
                // onComment = {handleComment}
                onPress={handlePress}
                isLiked={post.isLikedByCurrentUser}
            />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: Spacing.sm,
    }
})