import api from "@/services/axios";
import { API_BASE_URI } from "@/constants/theme";
export const registerUser = async (name: string, email: string, password: string) =>{
    try{
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    }catch(error: any){
        throw error?.response?.data || error;
    }
}

export const loginUser = async (email: string, password: string) =>{
    try{
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    }catch(error: any){
        throw error?.response?.data || error;
    }
}

export const getUserById = async (userId: string) =>{
    try{
        const response = await api.get(`/auth/user/${userId}`);
        return response.data;
    }catch(error: any){
        throw error?.response?.data || error;
    }
}
