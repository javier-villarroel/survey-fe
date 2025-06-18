import { useUpdateProfile } from '../useUpdateProfile';
import { ProfileFormData } from '../../lib/schemas';
import { UseFormReturn } from 'react-hook-form';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';

interface UseHandleOnSubmitProps {
    form: UseFormReturn<ProfileFormData>,
    refreshProfile: () => void;
}

export const useHandleOnSubmit = ({ form, refreshProfile }: UseHandleOnSubmitProps) => {
    const toast = useRef<Toast>(null);
    
    const { updateProfile, isLoading: isUpdating } = useUpdateProfile();

    const onSubmit = async (data: ProfileFormData) => {
        if(data.password && data.password !== data.confirmPassword) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error: Las contraseñas no coinciden',
                life: 3000,
                style: { background: '#8B0000', color: '#ffffff' },
                contentStyle: { background: '#8B0000', color: '#ffffff' }
            });
            return;
        }

        const { confirmPassword, profileImage, ...restData } = data;

        const formData = new FormData();
        
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        const payload: any = {
            firstName: restData.firstName,
            lastName: restData.lastName,
            email: restData.email,
            phone: restData.phone,
            twoFactorAuth: restData.twoFactorAuth,
            status: 'ACTIVE'
        };

        console.log('Payload:', payload);
        

        if (data.password) {
            payload.password = data.password;
        }

        // Agregar el payload como un campo JSON en el FormData
        formData.append('data', JSON.stringify(payload));

        const result = await updateProfile(formData);

        if (result) {
            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Perfil actualizado exitosamente',
                life: 3000
            });
            form.reset({
                ...restData,
                confirmPassword: ''
            });
            refreshProfile();
        }
    };

    return {
        onSubmit,
        isUpdating,
        toast
    };
};