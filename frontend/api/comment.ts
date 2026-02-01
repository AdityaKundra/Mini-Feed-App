import api from "@/services/axios";

export const addComment = async (postId: string, text: string) =>{
    try{
        const response = await api.post(`/comments/${postId}`, { text });
        return response.data;
    }catch(error: any){
        throw error?.response?.data || error;
    }
}

export const getComments = async (postId: string) =>{
    try{
        const response = await api.get(`/comments?postId=${postId}`);
        return response.data;
    }catch(error: any){
        throw error?.response?.data || error;
    }
}

export const updateComment = async (commentId: string, text: string) =>{
    try{
        const response = await api.put(`/comments/${commentId}`, { text });
        return response.data;
    }catch(error: any){
        throw error?.response?.data || error;
    }
}

export const deleteComment = async (commentId: string) =>{
    try{
        const response = await api.delete(`/comments/${commentId}`);
        return response.data;
    }catch(error: any){
        throw error?.response?.data || error;
    }
}
