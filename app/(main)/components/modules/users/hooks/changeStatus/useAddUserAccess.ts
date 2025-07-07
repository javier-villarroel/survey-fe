import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { IUser } from "../../services";
import { UserRoles } from "../../lib/enums";
import { UsersService } from "../../services/changeUserAddAccess";


interface PendingAction {
    user: IUser;
    action: "ASSIGN" | "UNASSIGN";
}

export const useAddUserAccess = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
    const toast = useRef<Toast>(null);

    const toggleUserAccess = async (user: IUser) => {
        setPendingAction({ 
            user,
            action: user.action || "UNASSIGN" 
        });
        setShowConfirmDialog(true);
    };

    const handleConfirm = async () => {
        if (!pendingAction) return false;

        try {
            setIsLoading(true);
            const payload = {
                roleId: UserRoles.ADMIN, // ID del rol de administrador
                action: pendingAction.action === "ASSIGN" ? 0 : 1 // 1 para asignar, 0 para revocar
            };
            console.log('pendingAction:', pendingAction);
            
            const userId = typeof pendingAction.user.id === 'number' 
                ? pendingAction.user.id.toString() 
                : pendingAction.user.id;

            await UsersService.updateUserAccess(userId, payload);

            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: `Se ha ${pendingAction.action === "ASSIGN" ? 'revocado' : 'asignado'} el rol de administrador correctamente`,
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