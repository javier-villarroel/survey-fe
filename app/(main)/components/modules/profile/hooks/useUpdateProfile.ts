import { useState } from 'react';
import { getCookie } from 'typescript-cookie';
import { updateUserService } from '../services/updateUserService';
import { IUpdateUserRequest } from '../services/types';
import { toast } from 'sonner';

export const useUpdateProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (userData: IUpdateUserRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            const userId = getCookie('userId');
            
            if (!userId) {
                throw new Error('No se encontró el ID del usuario');
            }

            const result = await updateUserService(userId, userData);
            
            if (!result) {
                throw new Error('Error al actualizar el perfil');
            }

            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el perfil';
            setError(errorMessage);
            toast.error(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateProfile,
        isLoading,
        error
    };
}; 