import api from "@/services/axios";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';

export const createPost = async (title: string, description: string) => {
    const response = await api.post('/posts', {
        title: title.trim(),
        description: description.trim(),
    });

    if (response.data.success) {
        return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to create post');
}

export const getPostById = async (postId: string) => {
    try {
        const response = await api.get(`/posts/${postId}`);
        return response.data;
    } catch (error: any) {
        throw error?.response?.data || error;
    }
}


export const updatePost = async (postId: string, title: string, description: string) => {
    try {
        const response = await api.put(`/posts/${postId}`, { title, description });
        return response.data;
    } catch (error: any) {
        throw error?.response?.data || error;
    }
}

export const deletePost = async (postId: string) => {
    try {
        const response = await api.delete(`/posts/${postId}`);
        return response.data;
    } catch (error: any) {
        throw error?.response?.data || error;
    }
}

export const getFeed = async (page: number, limit: number) => {
    try {
        const response = await api.get(`/posts/feed?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error: any) {
        throw error?.response?.data || error;
    }
}
