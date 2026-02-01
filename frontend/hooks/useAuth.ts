import { useState, useEffect, useCallback } from "react";
import {clearStorage, saveStorage, getStorage} from "@/services/storage";
import { registerUser, loginUser } from '../api/auth';
import { STORAGE_KEYS } from "@/constants/theme";
import { router } from "expo-router";

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}


export const useAuth = ()=>{
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        checkAuth()
    },[])

    const checkAuth = async ()=>{
        try{
            const storedToken = await getStorage(STORAGE_KEYS.AUTH_TOKEN);
            const storedUser = await getStorage(STORAGE_KEYS.USER_DATA);

            if (storedToken && storedUser) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
                setIsAuthenticated(true);
            }

        }catch(err){
            clearStorage()
            setUser(null);
            setToken('');
            setIsAuthenticated(false);
            
            return err;

        }
        finally{
            setLoading(false)
        }
    }

    const login = useCallback(async (email: string, password: string)=>{
        try{
            const loginResponse =  await loginUser(email, password);
            const {token: newToken, user: newUser} = loginResponse;

            saveStorage(STORAGE_KEYS.AUTH_TOKEN, newToken);
            saveStorage(STORAGE_KEYS.USER_DATA, JSON.stringify(newUser));

            setUser(newUser);
            setToken(newToken);
            setIsAuthenticated(true);

            return {
                success: true,
                message: "User logged in successfully",
                user: newUser
            };

        }catch(err: any){
            throw err;
        }

    },[])


    const register = useCallback(async(name:string, email:string, password:string)=>{
        try{
            const registerResponse = await registerUser(name, email, password);
            const {token: newToken, user: newUser} = registerResponse;

            saveStorage(STORAGE_KEYS.AUTH_TOKEN, newToken);
            saveStorage(STORAGE_KEYS.USER_DATA, JSON.stringify(newUser));

            setUser(newUser);
            setToken(newToken);
            setIsAuthenticated(true);

            return {
                success: true,
                message: "User registered successfully",
                user: newUser
            };

        }catch(err: any){
            throw err;
        }

    },[])

    const logout = useCallback(async()=>{
        try{
            clearStorage()
            setUser(null);
            setToken('');
            setIsAuthenticated(false);
            router.replace('/(auth)');
        }catch(err){
            // Logout error handled silently
        }
    },[]);

    return {
        login,
        register,
        logout,
        user,
        token,
        loading,
        isAuthenticated
    }

}