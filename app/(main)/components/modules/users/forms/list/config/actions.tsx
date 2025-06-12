import { TableAction } from "@/app/(main)/components/common/components/table/types";
import { IUser } from "../../../services/types";
import { toast } from "sonner";

interface ActionsConfig {
    onEdit: (user: IUser) => void;
    onDelete: (userId: number) => Promise<void>;
    onToggleStatus?: (user: IUser) => Promise<void>;
}

export const createActions = ({ onEdit, onDelete, onToggleStatus }: ActionsConfig): TableAction[] => {
    const handleDelete = async (user: IUser) => {
        try {
            await onDelete(user.id);
            toast.success('Usuario eliminado correctamente');
        } catch (error) {
            toast.error('Error al eliminar el usuario');
        }
    };

    const handleToggleStatus = async (user: IUser) => {
        try {
            if (onToggleStatus) {
                await onToggleStatus(user);
                toast.success(`Usuario ${user.status ? 'suspendido' : 'activado'} correctamente`);
            }
        } catch (error) {
            toast.error(`Error al ${user.status ? 'suspender' : 'activar'} el usuario`);
        }
    };

    const handleAssignRole = (user: IUser) => {
        toast.info('Función de asignar rol en desarrollo');
    };

    return [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            className: "p-button-info",
            onClick: onEdit
        },
        {
            label: "Suspender/Activar",
            icon: "pi pi-ban",
            className: "p-button-warning",
            onClick: handleToggleStatus,
            getLabel: (user: IUser) => user.status ? "Suspender" : "Activar",
            getIcon: (user: IUser) => user.status ? "pi pi-ban" : "pi pi-check",
            getClassName: (user: IUser) => user.status ? "p-button-warning" : "p-button-success"
        },
        {
            label: "Asignar admin",
            icon: "pi pi-users",
            className: "p-button-help",
            onClick: handleAssignRole
        },
        {
            label: "Eliminar",
            icon: "pi pi-trash",
            className: "p-button-danger",
            onClick: handleDelete
        }
    ];
}; 