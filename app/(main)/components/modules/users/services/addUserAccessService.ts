import { AxiosError } from "axios";
import { IUser, IUserResponse } from "./types";
import { UserRoles } from "../lib/enums";
import apiWithAuth from "@/app/api/axios";

interface AddAccessRequest {
    roleId: UserRoles | null;
}

export const addUserAccessService = async (userId: number, roleId: UserRoles | null = null): Promise<IUser | null> => {
    try {
        const requestBody: AddAccessRequest = {
            roleId: roleId
        };

        const { data } = await apiWithAuth.post<IUserResponse>(`/user/${userId}/add_access`, requestBody);
        return data.result;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.info?.message_to_show || 
                `Error al ${roleId ? 'asignar' : 'revocar'} acceso de administrador`);
        }
        throw error;
    }
}; 