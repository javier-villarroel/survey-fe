import { AxiosError } from "axios";
import { IUser, IUserResponse } from "./types";
import apiWithAuth from "@/app/api/axios";

interface RemoveUserRequest {
    status: boolean;
}

export const removeUserService = async (userId: number): Promise<IUser | null> => {
    try {
        const requestBody: RemoveUserRequest = {
            status: false
        };

        const { data } = await apiWithAuth.post<IUserResponse>(`/user/${userId}/remove`, requestBody);
        return data.result;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.info?.message_to_show || "Error al eliminar el usuario");
        }
        throw error;
    }
}; 