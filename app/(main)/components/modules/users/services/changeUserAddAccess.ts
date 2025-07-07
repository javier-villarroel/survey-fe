import apiWithAuth from "@/app/api/axios";
import { USER_API_BASE } from "./constants";

interface UpdateUserAccessPayload {
    roleId: number;
    action: number;
}

export class UsersService {
    static async updateUserAccess(userId: string, payload: UpdateUserAccessPayload) {
        const response = await apiWithAuth.patch(`${USER_API_BASE}/${userId}/add_access`, payload);
        return response.data;
    }
} 