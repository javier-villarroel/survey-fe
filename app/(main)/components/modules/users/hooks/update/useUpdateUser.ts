import { useState, useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { IUpdateUserRequest, IUser, updateUserService } from '../../services';

export const useUpdateUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const updateUser = useCallback(async (id: number, userData: IUpdateUserRequest): Promise<IUser | null> => {
        setIsLoading(true);
        setError(null);
        const result = await updateUserService(id, userData);
        if (result) {
            // Invalidar la caché de usuarios para forzar una recarga
            await queryClient.invalidateQueries({ queryKey: ['users'] });
        }
        setIsLoading(false);
        return result;
        
    }, [queryClient]);

    return {
        updateUser,
        isLoading,
        error
    };
}; 