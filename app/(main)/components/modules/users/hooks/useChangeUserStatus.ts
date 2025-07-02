import { useState, useRef } from "react";
import { changeUserStatusService } from "../services/changeUserStatusService";
import { UserStatus } from "../lib/enums";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from 'primereact/confirmdialog';

type ToastSeverity = "success" | "info" | "warn" | "error";

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
      
      let message = {
        summary: "",
        detail: "",
        severity: "success" as ToastSeverity,
        style: { background: '', color: '#ffffff' }
      };

      switch (pendingAction.status) {
        case UserStatus.ACTIVE:
          message = {
            summary: "Usuario Activado",
            detail: "El usuario ha sido activado exitosamente",
            severity: "success",
            style: { background: '#15803d', color: '#ffffff' }
          };
          break;
        case UserStatus.BLOQUED:
          message = {
            summary: "Usuario Suspendido",
            detail: "El usuario ha sido suspendido exitosamente",
            severity: "warn",
            style: { background: '#991b1b', color: '#ffffff' }
          };
          break;
        case UserStatus.DELETED:
          message = {
            summary: "Usuario Eliminado",
            detail: "El usuario ha sido eliminado exitosamente",
            severity: "success",
            style: { background: '#15803d', color: '#ffffff' }
          };
          break;
      }

      toast.current?.show({
        severity: message.severity,
        summary: message.summary,
        detail: message.detail,
        life: 3000,
        style: message.style,
        contentStyle: message.style
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