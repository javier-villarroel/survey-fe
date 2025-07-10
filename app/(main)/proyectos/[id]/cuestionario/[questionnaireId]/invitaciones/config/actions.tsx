import { TableAction } from "@/app/(main)/components/common/components/table/types";
import { Participant } from "../types";

interface CreateActionsProps {
    onEdit: (participant: Participant) => void;
    onDelete: (participantId: string) => void;
    onResend: (participant: Participant) => void;
}

export const createActions = ({
    onEdit,
    onDelete,
    onResend
}: CreateActionsProps): TableAction[] => [
    {
        label: "Editar",
        icon: "pi pi-pencil",
        className: "text-blue-500",
        onClick: (participant: Participant) => onEdit(participant)
    },
    {
        label: "Reenviar invitación",
        icon: "pi pi-refresh",
        className: "text-green-500",
        onClick: (participant: Participant) => onResend(participant)
    },
    {
        label: "Eliminar",
        icon: "pi pi-trash",
        className: "text-red-500",
        onClick: (participant: Participant) => onDelete(participant.id)
    }
]; 