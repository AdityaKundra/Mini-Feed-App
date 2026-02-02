import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { usePost } from '@/hooks/usePost';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostDetail() {
  const params = useLocalSearchParams<{ id?: string | string[], refresh?: string }>();
  const router = useRouter();

  const postId =
    typeof params.id === 'string' ? params.id : params.id?.[0];

  const [likesChanged, setLikesChanged] = useState(false);


  const { post, loading, error, toogleLikes, addComment } = usePost(
    postId ?? ''
  );

  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const handleLike = useCallback(() => {
    if (postId) {
      toogleLikes(postId);
    }
  }, [toogleLikes, postId]);

  const handleBackPress = useCallback(() => {
    // Navigate back to feed instead of trying to go back in navigation stack
    router.replace('/(tabs)');
  }, [router]);

  const headerLeft = useCallback(() => (
    <TouchableOpacity onPress={handleBackPress}>
      <Ionicons name="arrow-back" size={22} color={Colors.primary} />
    </TouchableOpacity>
  ), [handleBackPress]);

  const handleSubmitComment = useCallback(async () => {
    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    if (commentText.length > 200) {
      setCommentError('Comment must be under 200 characters');
      return;
    }

    try {
      setSubmittingComment(true);
      await addComment(commentText.trim());
      setCommentText('');
      setCommentModalVisible(false);
    } catch {
      Alert.alert('Error', 'Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  }, [commentText, addComment, postId]);

  const formatTimeAgo = (dateString: string) => {
    const diff =
      (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60);
    if (diff < 1) return `${Math.floor(diff * 60)}m ago`;
    if (diff < 24) return `${Math.floor(diff)}h ago`;
    return `${Math.floor(diff / 24)}d ago`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading post...</Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error || 'Post not found'}
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Post',
          headerLeft,
        }}
      />

      <ScrollView style={styles.container}>
        <Card
          profileImage=""
          username={post.author.name}
          createdAt={formatTimeAgo(post.createdAt)}
          content={post.description}
          commentCount={post.commentsCount}
          likesCount={post.likesCount}
          likes={post.likes}
          onLike={handleLike}
          onComment={() => setCommentModalVisible(true)}
          isLiked={post.isLikedByCurrentUser}
        />

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>
            Comments ({post.comments.length})
          </Text>

          {post.comments.map((comment) => (
            <View key={comment._id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>
                  {comment.author.name}
                </Text>
                <Text style={styles.commentTime}>
                  {formatTimeAgo(comment.createdAt)}
                </Text>
              </View>
              <Text>{comment.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={commentModalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Add Comment</Text>

              <TouchableOpacity
                onPress={handleSubmitComment}
                disabled={submittingComment}
              >
                <Text
                  style={{
                    ...styles.postButton,
                    ...(submittingComment ? styles.disabledButton : {}),
                  }}
                >
                  {submittingComment ? 'Posting…' : 'Post'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <Input
                label=""
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Write a comment..."
                error={commentError}
                multiline
                maxLength={200}
                style={styles.commentInput}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red' },

  commentsSection: { padding: Spacing.md },
  commentsTitle: { fontSize: 18, fontWeight: '600', marginBottom: Spacing.md },

  commentItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.sm
  },
  commentAuthor: { fontWeight: '600' },
  commentTime: { color: Colors.textSecondary, fontSize: 12 },

  modalContainer: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  cancelButton: { color: Colors.primary },
  postButton: { color: Colors.primary, fontWeight: '600' },
  disabledButton: { opacity: 0.5 },
  modalContent: { padding: Spacing.md, flex: 1 },
  commentInput: { minHeight: 120 },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
});
