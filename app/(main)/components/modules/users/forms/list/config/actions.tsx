import { TableAction } from "@/app/(main)/components/common/components/table/types";
import { IUser } from "../../../services/types";

interface ActionsConfig {
    onEdit?: (user: IUser) => void;
}

export const createActions = ({ onEdit }: ActionsConfig): TableAction[] => {
    return [
        {
            label: "Editar",
            icon: "pi pi-pencil",
            className: "p-button-warning",
            onClick: (user: IUser) => onEdit?.(user)
        }
    ];
}; 