import { useState, useCallback } from 'react';
import { updateUserService } from '../services/updateUserService';
import { IUser, IUpdateUserRequest } from '../services/types';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const updateUser = useCallback(async (id: number, userData: IUpdateUserRequest): Promise<IUser | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await updateUserService(id, userData);
            if (result) {
                // Invalidar la caché de usuarios para forzar una recarga
                await queryClient.invalidateQueries({ queryKey: ['users'] });
            }
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Error al actualizar usuario";
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [queryClient]);

    return {
        updateUser,
        isLoading,
        error
    };
}; 