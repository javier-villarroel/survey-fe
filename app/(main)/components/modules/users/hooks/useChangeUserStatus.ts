import { useState, useRef } from "react";
import { changeUserStatusService } from "../services/changeUserStatusService";
import { UserStatus } from "../lib/enums";
import { Toast } from "primereact/toast";

export const useChangeUserStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const changeUserStatus = async (userId: number, status: UserStatus) => {
    try {
      setIsLoading(true);
      const result = await changeUserStatusService(userId, status);
      
      toast.current?.show({
        severity: status === UserStatus.ACTIVE ? "success" : "warn",
        summary: status === UserStatus.ACTIVE ? "Usuario Activado" : "Usuario Suspendido",
        detail: status === UserStatus.ACTIVE 
          ? "El usuario ha sido activado exitosamente" 
          : "El usuario ha sido suspendido exitosamente",
        life: 3000,
        style: {
          background: status === UserStatus.ACTIVE ? '#15803d' : '#991b1b',
          color: '#ffffff'
        },
        contentStyle: {
          background: status === UserStatus.ACTIVE ? '#15803d' : '#991b1b',
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
    }
  };

  return {
    changeUserStatus,
    isLoading,
    toast,
  };
}; 