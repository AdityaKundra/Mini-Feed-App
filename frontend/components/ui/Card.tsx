import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, Image, Pressable } from 'react-native';
import { Colors, BorderRadius, Spacing, FontSize, Shadows } from '@/constants/theme';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { LikesModal } from '../LikesModal';

interface CardProps {
    profileImage?: string,
    username: string,
    createdAt: string,
    content: string,
    commentCount: number,
    likesCount: number,
    likes: Array<{
        _id: string,
        name: string,
    }>,
    onLike: () => void,
    onComment?: () => void,
    style?: ViewStyle,
    onPress?: () => void,
    isLiked?: boolean,
}

export const Card = ({
    profileImage,
    username,
    createdAt,
    content,
    commentCount,
    likesCount,
    likes,
    onLike,
    onComment,
    style,
    onPress,
    isLiked = false,
}: CardProps) => {
    const [likesModalVisible, setLikesModalVisible] = useState(false);

    const handleLikesPress = () => {
        if (likesCount > 0) {
            setLikesModalVisible(true);
        }
    };

    return (
        <View style={[styles.postContainer]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileImagePlaceholder}>
                            <Ionicons name="person" size={20} color="#666" />
                        </View>
                    )}
                    {username && (
                        <View>
                            <Text style={styles.usernameText}>{username}</Text>
                        </View>
                    )}
                </View>
                <Pressable style={styles.optionsButton}>
                    <Text color={Colors.textSecondary}>...</Text>
                </Pressable>
            </View>

            {/* Content */}
            {content && (
                <View>
                    <Text style={styles.contentText}>
                        {content}
                    </Text>
                </View>
            )}

            {/* Action Bar */}
            <View style={styles.actionBarContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.actionButton,
                        isLiked && styles.likedButton,
                        pressed && styles.pressedButton
                    ]}
                    onPress={onLike}
                >
                    <Ionicons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={20}
                        color={isLiked ? Colors.like : Colors.textSecondary}
                    />
                    <Pressable style={styles.likesCountButton} onPress={handleLikesPress}>
                        <Text style={{
                            ...styles.actionButtonText,
                            ...(isLiked ? styles.likedText : {})
                        }}>
                            {likesCount}
                        </Text>
                    </Pressable>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.actionButton,
                        pressed && styles.pressedButton
                    ]}
                    onPress={onComment}
                >
                    <Ionicons name="chatbubble-outline" size={20} color={Colors.comment} />
                    <Text style={styles.actionButtonText}>{commentCount}</Text>
                </Pressable>
            </View>

            {/* Likes Modal */}
            <LikesModal
                visible={likesModalVisible}
                onClose={() => setLikesModalVisible(false)}
                likes={likes}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        marginHorizontal: Spacing.md,
        marginVertical: Spacing.sm,
        padding: Spacing.lg,
        ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    profileImage: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.full,
        borderWidth: 2,
        borderColor: Colors.primaryLight,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.md,
    },
    usernameText: {
        fontSize: FontSize.titleMedium,
        color: Colors.text,
        fontWeight: '600',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    optionsButton: {
        padding: Spacing.sm,
        borderRadius: BorderRadius.sm,
        backgroundColor: Colors.surfaceVariant,
    },
    contentText: {
        fontSize: FontSize.bodyLarge,
        color: Colors.text,
        lineHeight: 24,
        marginTop: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    profileImagePlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.border,
        marginRight: Spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagesContainer: {
        marginBottom: Spacing.sm,
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
    },
    singleImage: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: BorderRadius.md,
    },
    twoImagesContainer: {
        flexDirection: 'row',
    },
    twoImage: {
        flex: 1,
        aspectRatio: 1,
    },
    multipleImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    multipleImage: {
        width: '49%',
        aspectRatio: 1,
        marginRight: 2,
        marginBottom: 2,
    },
    actionBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Spacing.lg,
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.separator,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.surfaceVariant,
    },
    likesCountButton: {
        paddingVertical: Spacing.xs,
        paddingHorizontal: Spacing.sm,
        borderRadius: BorderRadius.sm,
    },
    actionButtonText: {
        fontSize: FontSize.labelMedium,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    likedButton: {
        backgroundColor: Colors.like + '10', // Very light red background
        borderWidth: 1,
        borderColor: Colors.like + '20',
    },
    likedText: {
        color: Colors.like,
        fontWeight: '600',
    },
    pressedButton: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
});