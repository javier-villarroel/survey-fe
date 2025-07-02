import { useState, useRef } from "react";
import { removeUserService } from "../services/removeUserService";
import { Toast } from "primereact/toast";
import { changeUserStatusService } from "../services/changeUserStatusService";
import { UserStatus } from "../lib/enums";

export const useRemoveUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    const removeUser = async (userId: number) => {
        try {
            setIsLoading(true);
            const result = await changeUserStatusService(userId, UserStatus.DELETED);
            toast.current?.show({
                severity: "success",
                summary: "Usuario Eliminado",
                detail: "El usuario ha sido eliminado exitosamente",
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

            return result;
        } catch (error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error instanceof Error ? error.message : "Error al eliminar el usuario",
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
        removeUser,
        isLoading,
        toast,
    };
}; 