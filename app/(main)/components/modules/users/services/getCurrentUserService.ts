import apiWithAuth from "@/app/api/axios";
import { IUser } from "./types";
import { UserStatus } from "../lib/enums";

export const getCurrentUserService = async (): Promise<IUser> => {
    try {
        console.log('Fetching current user...');
        const { data } = await apiWithAuth.get<IUser>('/users/me');
        console.log('Current user data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        // En lugar de lanzar el error, devolvemos un objeto con el email de la cookie
        // como fallback temporal
        const emailFromCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('email='))
            ?.split('=')[1];

        if (emailFromCookie) {
            console.log('Using email from cookie as fallback:', emailFromCookie);
            return {
                id: '0',
                email: decodeURIComponent(emailFromCookie),
                firstName: '',
                lastName: '',
                status: UserStatus.ACTIVE,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                role: {
                    id: 0,
                    name: 'default',
                    roleProcess: []
                },
                isAdmin: false
            };
        }
        throw error;
    }
}; 