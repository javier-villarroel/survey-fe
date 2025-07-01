import { TableAction } from "@/app/(main)/components/common/components/table/types";
import { IUser } from "../../../services/types";
import { UserStatus } from "../../../lib/enums";

interface ActionsConfig {
    onEdit?: (user: IUser) => void;
    onStatusChange?: (user: IUser, newStatus: UserStatus) => void;
    onAddAccess?: (user: IUser) => void;
    onRemove?: (user: IUser) => void;
}

export const createActions = ({ onEdit, onStatusChange, onAddAccess, onRemove }: ActionsConfig): TableAction[] => {
    return [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            className: "p-button-warning",
            onClick: (user: IUser) => onEdit?.(user)
        },
        {
            label: "Cambiar estado",
            icon: "pi pi-refresh",
            getLabel: (user: IUser) => user.status === UserStatus.ACTIVE ? "Suspender" : "Activar",
            getIcon: (user: IUser) => user.status === UserStatus.ACTIVE ? "pi pi-ban" : "pi pi-check",
            getClassName: (user: IUser) => user.status === UserStatus.ACTIVE ? "p-button-danger" : "p-button-success",
            onClick: (user: IUser) => onStatusChange?.(
                user, 
                user.status === UserStatus.ACTIVE ? UserStatus.BLOQUED : UserStatus.ACTIVE
            )
        },
        {
            label: "Asignar Admin",
            icon: "pi pi-user-plus",
            className: "p-button-help",
            onClick: (user: IUser) => onAddAccess?.(user)
        },
        {
            label: "Eliminar",
            icon: "pi pi-trash",
            className: "p-button-danger",
            onClick: (user: IUser) => onRemove?.(user)
        }
    ];
}; 