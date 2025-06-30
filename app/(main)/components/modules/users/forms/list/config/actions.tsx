import { IUser } from "../../../services/types";
import { toast } from "sonner";
import { ColumnProps } from "primereact/column";
import ActionDropdown from "../../../lib/actions";
import apiWithAuth from "@/app/api/axios";

type UserStatus = "ACTIVE" | "BLOQUED";

interface ActionsConfig {
    onEdit?: (user: IUser) => void;
    onDelete?: (user: IUser) => void;
    onToggleStatus?: (user: IUser) => Promise<void>;
}

interface TableAction {
    label: string | ((row: IUser) => string);
    icon: string | ((row: IUser) => string);
    className: string | ((row: IUser) => string);
    onClick: (row: IUser) => void | Promise<void>;
}

export const createActions = ({ onEdit, onDelete, onToggleStatus }: ActionsConfig): TableAction[] => {
    const handleToggleStatus = async (user: IUser) => {
        const newStatus: UserStatus = user.status === "ACTIVE" ? "BLOQUED" : "ACTIVE";
        console.log('pase')
        try {
            console.log('pase2')
            const response = await apiWithAuth.post(`/user/${user.id}/change_status`, {
                status: newStatus
            });
            
            if (response.status === 200) {
                console.log('pase22')
                toast.success(`Usuario ${newStatus === "ACTIVE" ? "activado" : "suspendido"} exitosamente`);
                if (onToggleStatus) {
                    await onToggleStatus(user);
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(`Error al ${newStatus === "ACTIVE" ? "activar" : "suspender"} el usuario`);
            console.error("Error en handleToggleStatus:", error);
        }
    };

    const handleAssignRole = async (user: IUser) => {
        try {
            const response = await apiWithAuth.post(`/user/${user.id}/add_access`, {
                roleId: 1
            });
            
            if (response.status === 200) {
                toast.success("Rol de administrador asignado exitosamente");
                if (onToggleStatus) {
                    await onToggleStatus(user);
                }
            }
        } catch (error) {
            toast.error("Error al asignar rol de administrador");
            console.error("Error en handleAssignRole:", error);
        }
    };

    return [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            className: "p-button-warning",
            onClick: (user: IUser) => onEdit?.(user)
        },
        {
            label: "Eliminar",
            icon: "pi pi-trash",
            className: "p-button-danger",
            onClick: async (user: IUser) => {
                try {
                    if (onDelete) {
                        await onDelete(user);
                        toast.success("Usuario eliminado exitosamente");
                    }
                } catch (error) {
                    toast.error("Error al eliminar el usuario");
                }
            }
        },
        {
            label: (user: IUser) => user.status === "ACTIVE" ? "Suspender" : "Activar",
            icon: (user: IUser) => user.status === "ACTIVE" ? "pi pi-ban" : "pi pi-check",
            className: (user: IUser) => user.status === "ACTIVE" ? "p-button-danger" : "p-button-success",
            onClick: handleToggleStatus
        },
        {
            label: "Asignar admin",
            icon: "pi pi-users",
            className: "p-button-help",
            onClick: handleAssignRole
        }
    ];
};

export const getActionColumn = (onActionComplete: () => void): ColumnProps => ({
    field: 'actions',
    header: 'Acciones',
    body: (row: any) => <ActionDropdown row={row} onActionComplete={onActionComplete} />,
    style: { width: '250px' }
}); 