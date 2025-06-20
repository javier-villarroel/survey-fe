import { useState, useEffect } from 'react';
import { getCookie } from 'typescript-cookie';
import { getUserByIdService } from '../services/getUserByIdService';
import { IUser } from '../services/types';

export const useFetchProfile = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const userId = getCookie('userId');
            
            if (!userId) {
                setError('No se encontró el ID del usuario');
                return;
            }

            const userData = await getUserByIdService(userId);
            if (userData) {
                setUser(userData);
            } else {
                setError('No se pudo obtener la información del usuario');
            }
        } catch (err) {
            setError('Error al cargar el perfil del usuario');
            console.error('Error fetching user profile:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return {
        user,
        isLoading,
        error,
        refreshProfile: fetchUserProfile
    };
}; 