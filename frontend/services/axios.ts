import axios from 'axios';
import { API_BASE_URI, STORAGE_KEYS } from '@/constants/theme';
import { clearStorage, getStorage } from './storage';

const api = axios.create({
    baseURL: API_BASE_URI,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000, // 10 second timeout
});

api.interceptors.request.use(
    async (config) => {
        const token = await getStorage(STORAGE_KEYS.AUTH_TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    async(error) => {
        // Handle CORS errors
        if (error.code === 'ERR_NETWORK') {
            // Network error occurred
            // You might want to show a user-friendly message here
        }

        if(error.response && error.response.status === 401){
            await clearStorage();
            return Promise.reject(error);
        }

        // Handle other CORS-related errors
        if (error.response && error.response.status === 0) {
            // CORS blocked or network error
        }

        return Promise.reject(error);
    }
);


export default api;