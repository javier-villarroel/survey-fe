import { useState, useRef } from "react";
import { addUserAccessService } from "../services/addUserAccessService";
import { Toast } from "primereact/toast";

export const useAddUserAccess = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    const addUserAccess = async (userId: number) => {
        try {
            setIsLoading(true);
            const result = await addUserAccessService(userId);
            
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: "Acceso de administrador asignado correctamente",
                life: 3000,
            });

            return result;
        } catch (error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error instanceof Error ? error.message : "Error al asignar acceso de administrador",
                life: 3000,
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        addUserAccess,
        isLoading,
        toast,
    };
}; 