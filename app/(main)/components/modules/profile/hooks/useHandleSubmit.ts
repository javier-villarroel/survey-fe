import { useUpdateProfile } from './useUpdateProfile';
import type { ProfileFormData } from '../lib/schemas';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';

export const useHandleSubmit = () => {
    const { updateProfile, isLoading } = useUpdateProfile();
    const toast = useRef<Toast>(null);

    const handleSubmit = async (data: ProfileFormData) => {
        try {
            // Validación de contraseñas si se proporcionan
            if (data.password || data.confirmPassword) {
                if (!data.password || !data.confirmPassword) {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Debe completar ambos campos de contraseña',
                        life: 3000,
                        style: { background: '#8B0000', color: '#ffffff' },
                        contentStyle: { background: '#8B0000', color: '#ffffff' }
                    });
                    return false;
                }
                if (data.password !== data.confirmPassword) {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Las contraseñas no coinciden',
                        life: 3000,
                        style: { background: '#8B0000', color: '#ffffff' },
                        contentStyle: { background: '#8B0000', color: '#ffffff' }
                    });
                    return false;
                }
                if (data.password.length < 8) {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'La contraseña debe tener al menos 8 caracteres',
                        life: 3000,
                        style: { background: '#8B0000', color: '#ffffff' },
                        contentStyle: { background: '#8B0000', color: '#ffffff' }
                    });
                    return false;
                }
            }

            // Preparar datos para la actualización
            const updateData = {
                firstName: data.name,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                twoFactorAuth: data.twoFactorAuth,
                status: 'ACTIVE'
            } as const;

            // Agregar contraseña solo si se proporciona y es válida
            if (data.password && data.password === data.confirmPassword) {
                const result = await updateProfile({
                    ...updateData,
                    password: data.password
                });
                if (result) {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Perfil actualizado exitosamente',
                        life: 3000
                    });
                }
                return result;
            }

            const result = await updateProfile(updateData);
            if (result) {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Perfil actualizado exitosamente',
                    life: 3000
                });
            }
            return result;
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al actualizar el perfil',
                life: 3000,
                style: { background: '#8B0000', color: '#ffffff' },
                contentStyle: { background: '#8B0000', color: '#ffffff' }
            });
            return false;
        }
    };

    return {
        handleSubmit,
        isLoading,
        toast
    };
}; 