import { useState, useRef } from "react";
import { changeUserStatusService } from "../services/changeUserStatusService";
import { UserStatus } from "../lib/enums";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from 'primereact/confirmdialog';

export const useChangeUserStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    userId: number;
    status: UserStatus;
  } | null>(null);
  const toast = useRef<Toast>(null);

  const handleConfirm = async () => {
    if (!pendingAction) return;
    
    try {
      setIsLoading(true);
      const result = await changeUserStatusService(pendingAction.userId, pendingAction.status);
      
      toast.current?.show({
        severity: pendingAction.status === UserStatus.ACTIVE ? "success" : "warn",
        summary: pendingAction.status === UserStatus.ACTIVE ? "Usuario Activado" : "Usuario Suspendido",
        detail: pendingAction.status === UserStatus.ACTIVE 
          ? "El usuario ha sido activado exitosamente" 
          : "El usuario ha sido suspendido exitosamente",
        life: 3000,
        style: {
          background: pendingAction.status === UserStatus.ACTIVE ? '#15803d' : '#991b1b',
          color: '#ffffff'
        },
        contentStyle: {
          background: pendingAction.status === UserStatus.ACTIVE ? '#15803d' : '#991b1b',
          color: '#ffffff'
        }
      });

      return result;
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error instanceof Error ? error.message : "Error al cambiar el estado del usuario",
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

  const changeUserStatus = (userId: number, status: UserStatus) => {
    setPendingAction({ userId, status });
    setShowConfirmDialog(true);
  };

  const handleReject = () => {
    setPendingAction(null);
    setShowConfirmDialog(false);
  };

  return {
    changeUserStatus,
    isLoading,
    toast,
    showConfirmDialog,
    handleConfirm,
    handleReject,
    pendingAction
  };
}; 