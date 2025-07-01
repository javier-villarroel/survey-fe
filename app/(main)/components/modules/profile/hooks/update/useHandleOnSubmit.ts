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
        
        // Si hay una imagen seleccionada, la agregamos al FormData
        if (profileImage instanceof File) {
            formData.append('profileImage', profileImage);
        }

        // Agregamos todos los campos al mismo nivel
        formData.append('firstName', restData.firstName);
        formData.append('lastName', restData.lastName);
        formData.append('email', restData.email);
        if (restData.phone) {
            formData.append('phone', restData.phone);
        }
        formData.append('twoFactorAuth', restData.twoFactorAuth.toString());
        formData.append('status', 'ACTIVE');

        // Si hay contraseña, la agregamos
        if (data.password) {
            formData.append('password', data.password);
        }

        const result = await updateProfile(formData);

        if (result) {
            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Perfil actualizado exitosamente',
                life: 3000,
                style: { background: '#15803d', color: '#ffffff' },
                contentStyle: { background: '#15803d', color: '#ffffff' }
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