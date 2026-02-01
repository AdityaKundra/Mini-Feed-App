import api from "@/services/axios";

export const handleLike = async (postId: string) =>{
    try{
        const response = await api.post(`/likes/${postId}`);
        return response.data;
    }catch(error: any){
        throw error?.response?.data || error;
    }
}