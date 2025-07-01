import { AxiosError } from "axios";
import { IUser, IUserResponse } from "./types";
import { UserRoles } from "../lib/enums";
import apiWithAuth from "@/app/api/axios";

interface AddAccessRequest {
    roleId: UserRoles;
}

export const addUserAccessService = async (userId: number): Promise<IUser | null> => {
    try {
        const requestBody: AddAccessRequest = {
            roleId: UserRoles.ADMIN
        };

        const { data } = await apiWithAuth.post<IUserResponse>(`/user/${userId}/add_access`, requestBody);
        return data.result;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.info?.message_to_show || "Error al asignar acceso de administrador");
        }
        throw error;
    }
}; 