import { AxiosError } from "axios";
import { toast } from "sonner";
import { IUpdateUserRequest } from './types';
import apiWithAuth from '@/app/api/axios';
import { USER_API_BASE } from "./constants";

export const updateUserService = async (userId: string, data: IUpdateUserRequest) => {
    try {
        const config = data instanceof FormData ? {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        } : {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await apiWithAuth.put(`/user/${userId}`, data, config);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
}; 