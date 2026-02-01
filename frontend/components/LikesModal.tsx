import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from './ui/Text';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface LikesModalProps {
    visible: boolean;
    onClose: () => void;
    likes: Array<{
        _id: string;
        name: string;
    }>;
}

interface LikedUser {
    _id: string;
    name: string;
}

export const LikesModal: React.FC<LikesModalProps> = ({
    visible,
    onClose,
    likes,
}) => {
    const renderUser = ({ item }: { item: LikedUser }) => (
        <View style={styles.userItem}>
            <View style={styles.userAvatar}>
                <Ionicons name="person" size={20} color={Colors.textSecondary} />
            </View>
            <Text style={styles.userName}>{item.name}</Text>
        </View>
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No likes yet</Text>
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Likes ({likes.length})
                    </Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Content */}
                <FlatList
                    data={likes}
                    renderItem={renderUser}
                    keyExtractor={(item) => item._id}
                    ListEmptyComponent={renderEmpty}
                    contentContainerStyle={likes.length === 0 ? styles.emptyList : undefined}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.background,
    },
    closeButton: {
        padding: Spacing.sm,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    placeholder: {
        width: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: Spacing.md,
        color: Colors.textSecondary,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    errorText: {
        color: '#ff4444',
        textAlign: 'center',
        marginBottom: Spacing.md,
    },
    retryButton: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        backgroundColor: Colors.primary,
        borderRadius: 8,
    },
    retryText: {
        color: Colors.background,
        fontWeight: '600',
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.separator,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    userName: {
        fontSize: 16,
        color: Colors.textPrimary,
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    emptyText: {
        color: Colors.textSecondary,
        fontSize: 16,
    },
    emptyList: {
        flexGrow: 1,
    },
});