import { useState, useRef } from "react";
import { addUserAccessService } from "../services/addUserAccessService";
import { Toast } from "primereact/toast";
import { UserRoles } from '../lib/enums';

export const useAddUserAccess = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingAction, setPendingAction] = useState<{
        userId: number;
        isGranting: boolean;
    } | null>(null);
    const toast = useRef<Toast>(null);

    const handleConfirm = async () => {
        if (!pendingAction) return null;
        
        try {
            setIsLoading(true);
            const result = await addUserAccessService(pendingAction.userId, pendingAction.isGranting ? UserRoles.ADMIN : null);
            
            toast.current?.show({
                severity: pendingAction.isGranting ? "success" : "info",
                summary: pendingAction.isGranting ? "Éxito" : "Completado",
                detail: pendingAction.isGranting 
                    ? "Acceso de administrador asignado correctamente"
                    : "Acceso de administrador revocado correctamente",
                life: 3000,
                style: {
                    background: pendingAction.isGranting ? '#15803d' : '#1e40af',
                    color: '#ffffff'
                },
                contentStyle: {
                    background: pendingAction.isGranting ? '#15803d' : '#1e40af',
                    color: '#ffffff'
                }
            });

            return result;
        } catch (error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error instanceof Error 
                    ? error.message 
                    : `Error al ${pendingAction.isGranting ? 'asignar' : 'revocar'} acceso de administrador`,
                life: 3000,
                style: {
                    background: '#991b1b',
                    color: '#ffffff'
                },
                contentStyle: {
                    background: '#991b1b',
                    color: '#ffffff'
                }
            });
            return null;
        } finally {
            setIsLoading(false);
            setPendingAction(null);
            setShowConfirmDialog(false);
        }
    };

    const toggleUserAccess = (userId: number, isGranting: boolean) => {
        setPendingAction({ userId, isGranting });
        setShowConfirmDialog(true);
    };

    const handleReject = () => {
        setPendingAction(null);
        setShowConfirmDialog(false);
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