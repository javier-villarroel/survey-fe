import { useFetchProfile } from './useFetchProfile';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import type { ProfileFormData } from '../lib/schemas';
import { useHandleSubmit } from './useHandleSubmit';
import { toast } from 'sonner';

export const useProfileInfo = (
    form: UseFormReturn<ProfileFormData>
) => {
    const { user, refreshProfile } = useFetchProfile();
    const { handleSubmit: submitHandler, isLoading } = useHandleSubmit();

    useEffect(() => {
        if (user) {
            form.reset({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                twoFactorAuth: user.twoFactorAuth || false,
                password: '',
                confirmPassword: ''
            });
        }
    }, [user, form]);

    const onSubmit = async (data: ProfileFormData) => {
        const success = await submitHandler(data);
        if (success) {
            toast.success('Perfil actualizado exitosamente');
            form.reset({
                ...data,
                confirmPassword: ''
            });
            refreshProfile();
        }
    };

    return {
        onSubmit,
        refreshProfile,
        isLoading
    };
}; 