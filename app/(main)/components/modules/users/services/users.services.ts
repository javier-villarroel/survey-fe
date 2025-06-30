import apiWithAuth from '@/app/api/axios';

interface ServiceResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export const addUserRoleService = async (userId: number): Promise<ServiceResponse> => {
    try {
        await apiWithAuth.post(`/api/user/${userId}/add_access`, {
            roleId: 1
        });
        
        return {
            success: true,
            message: 'Rol de administrador asignado exitosamente'
        };
    } catch (error: any) {
        console.error('Error en addUserRoleService:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al asignar el rol de administrador'
        };
    }
};

export const changeUserStatusService = async (userId: number, status: 'ACTIVE' | 'BLOQUED'): Promise<ServiceResponse> => {
    try {
        await apiWithAuth.post(`/api/user/${userId}/change_status`, {
            status
        });
        
        return {
            success: true,
            message: `Usuario ${status === 'ACTIVE' ? 'activado' : 'bloqueado'} exitosamente`
        };
    } catch (error: any) {
        console.error('Error en changeUserStatusService:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al cambiar el estado del usuario'
        };
    }
}; 