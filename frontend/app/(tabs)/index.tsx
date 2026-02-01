import React, { useCallback, useMemo, useEffect } from 'react';
import {View, FlatList, RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';
import { router, useRouter, useFocusEffect } from 'expo-router';
import { useFeed } from '@/hooks/useFeed';
import { Spacing, Colors, FontSize, BorderRadius, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { PostCard } from '@/components/PostCard';


export default function Home() {

  const router = useRouter();

  const {posts,
    loadMore,
    loading,
    Refreshing,
    morePost,
    error,
    loadMorePost,
    refresh,
    likedPostIds,
    toogleLikes} = useFeed();

    const handlePostPress = useCallback((postId: string) => {
      router.push(`/post/${postId}`);
    }, [router]);

    const handleCreatePost = useCallback(()=>{
      router.push(`/add-post`);
    },[router])

    const renderItem = useCallback(({ item }: { item: any }) => (
      <PostCard
        post={item}
        onLike={toogleLikes}
        onPress={handlePostPress}
      />
    ), [toogleLikes, handlePostPress]);

    const postsKeys = useCallback((item: any) => item.id, [])

    const memoizedData = useMemo(() => posts, [posts])

    // Removed automatic refresh on focus to prevent continuous API calls
    // Users can manually refresh via pull-to-refresh when needed

    const renderFooter = useCallback(() => {
      if (!loadMore) return null;
      return (
        <View style={styles.footer}>
          <Text>Loading more posts...</Text>
        </View>
      );
    }, [loadMore]);
  
    const renderEmpty = useCallback(() => {
      if (loading) return null;
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts yet. Be the first to create one!</Text>
        </View>
      );
    }, [loading]);

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={refresh} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <FlatList
        data={memoizedData}
        renderItem={renderItem}
        keyExtractor={postsKeys}
        onEndReached={loadMorePost}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={Refreshing}
            onRefresh={refresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          posts.length === 0 ? styles.emptyList : undefined
        ]}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingVertical: Spacing.sm,
  },
  headerRight: {
    marginRight: Spacing.md,
  },
  footer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    fontSize: FontSize.headlineSmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontWeight: '500',
  },
  emptyList: {
    flexGrow: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.bodyLarge,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontWeight: '500',
  },
  retryButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
  },
  retryText: {
    color: Colors.surface,
    fontSize: FontSize.labelLarge,
    fontWeight: '600',
  },
});
