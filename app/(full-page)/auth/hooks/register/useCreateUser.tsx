import { useState } from 'react';
import { createUserService } from '../../services/Auth/auth.services';
import { CreateUserForm } from '../../lib/schemas';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface UseCreateUserReturn {
    createUser: (data: CreateUserForm) => Promise<void>;
    isLoading: boolean;
}

export const useCreateUser = (): UseCreateUserReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const createUser = async (data: CreateUserForm) => {
        if (isLoading) return;

        try {
            setIsLoading(true);
            const response = await createUserService(data);

            if ('error' in response) {
                toast.error(response.error);
                return;
            }

            toast.success('Usuario creado exitosamente');
            router.push('/auth/login');
        } catch (error) {
            toast.error('Error al crear el usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createUser,
        isLoading
    };
}; 