import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { UsersService } from '../services/users.services';

interface PendingAction {
    userId: string;
    isAdmin: boolean;
}

export const useAddUserAccess = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
    const toast = useRef<Toast>(null);

    const toggleUserAccess = async (userId: string, isAdmin: boolean) => {
        setPendingAction({ userId, isAdmin });
        setShowConfirmDialog(true);
    };

    const handleConfirm = async () => {
        if (!pendingAction) return false;

        try {
            setIsLoading(true);
            const payload = {
                roleId: 1, // ID del rol de administrador
                action: pendingAction.isAdmin ? 1 : 0 // 1 para asignar, 0 para remover
            };

            await UsersService.updateUserAccess(pendingAction.userId, payload);

            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: `Se ha ${pendingAction.isAdmin ? 'asignado' : 'removido'} el rol de administrador correctamente`,
                life: 3000
            });

            setShowConfirmDialog(false);
            setPendingAction(null);
            return true;
        } catch (error) {
            console.error('Error al actualizar el acceso:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo actualizar el acceso del usuario',
                life: 3000
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleReject = () => {
        setShowConfirmDialog(false);
        setPendingAction(null);
    };

    return {
        toggleUserAccess,
        isLoading,
        toast,
        showConfirmDialog,
        handleConfirm,
        handleReject,
        pendingAction
    };
}; 