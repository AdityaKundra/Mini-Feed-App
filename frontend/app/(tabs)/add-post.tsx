import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spacing, Colors } from '@/constants/theme';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createPost } from '@/api/post';
import { useAuth } from '@/hooks/useAuth';

interface CreatePostFormData {
  title: string;
  description: string;
}

export default function AddPostScreen() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<CreatePostFormData>({
    defaultValues: {
      title: '',
      description: ''
    },
    mode: 'onChange'
  });

  const handleCreatePost = async (data: CreatePostFormData) => {
    try {
      setIsSubmitting(true);
      setError('');

      await createPost(data.title.trim(), data.description.trim());

      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text variant="heading" style={styles.headerTitle}>Create Post</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text variant="caption" style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Controller
            control={control}
            name="title"
            rules={{
              required: 'Title is required',
              minLength: {
                value: 1,
                message: 'Title cannot be empty'
              },
              maxLength: {
                value: 100,
                message: 'Title must be less than 100 characters'
              }
            }}
            render={({ field, fieldState }) => (
              <Input
                label="Title"
                placeholder="Enter post title"
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                maxLength={100}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            rules={{
              required: 'Description is required',
              minLength: {
                value: 1,
                message: 'Description cannot be empty'
              },
              maxLength: {
                value: 500,
                message: 'Description must be less than 500 characters'
              }
            }}
            render={({ field, fieldState }) => (
              <Input
                label="Description"
                placeholder="What's on your mind?"
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                multiline
                numberOfLines={4}
                maxLength={500}
              />
            )}
          />

          <Button
            title="Create Post"
            onPress={handleSubmit(handleCreatePost)}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40, // Same width as back button for centering
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  form: {
    flex: 1,
  },
  submitButton: {
    marginTop: Spacing.xl,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },
});