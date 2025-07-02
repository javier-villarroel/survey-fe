import apiWithAuth from "@/app/api/axios";

interface UpdateUserAccessPayload {
    roleId: number;
    action: number;
}

export class UsersService {
    static async updateUserAccess(userId: string, payload: UpdateUserAccessPayload) {
        const response = await apiWithAuth.post(`/user/${userId}/add_access`, payload);
        return response.data;
    }
} 