import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '@/constants/theme';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web' || (typeof window !== 'undefined' && !!window.localStorage);

const saveStorage = async (key: string, value: string) => {
    if (isWeb) {
        try {
            window.localStorage.setItem(key, value);
            return true ;
        } catch (err) {
            console.error('Error saving storage:', err);
            return false;
        }
    }

    if (SecureStore && typeof (SecureStore as any).setItemAsync === 'function') {
        await (SecureStore as any).setItemAsync(key, value);
    } else if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return true;
    }
    return false;
}

const getStorage = async (key: string) => {
    if (isWeb) {
        try {
            return window.localStorage.getItem(key);
        } catch (err) {
            // Storage get error
            return null;
        }
    }

    if (SecureStore && typeof (SecureStore as any).getItemAsync === 'function') {
        return await (SecureStore as any).getItemAsync(key);
    } else if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
    }

    return null;
}

const deleteStorage = async (key: string) => {
    if (isWeb) {
        try {
            window.localStorage.removeItem(key);
            return true;
        } catch (err) {
            console.error('Error deleting storage:', err);
            return false;
        }
    }

    if (SecureStore && typeof (SecureStore as any).deleteItemAsync === 'function') {
        await (SecureStore as any).deleteItemAsync(key);
    } else if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return true;
    }
    return false;
}

const clearStorage = async () => {
    await deleteStorage(STORAGE_KEYS.AUTH_TOKEN);
    await deleteStorage(STORAGE_KEYS.USER_DATA);
}

export { saveStorage, getStorage, deleteStorage, clearStorage };