import { TableAction } from "@/app/(main)/components/common/components/table/types";
import { Questionnaire } from "../types";

interface CreateActionsProps {
    onDetail: (questionnaire: Questionnaire) => void;
    onEdit: (questionnaire: Questionnaire) => void;
    onDuplicate: (questionnaire: Questionnaire) => void;
    onDelete: (questionnaireId: string) => void;
    onShare: (questionnaire: Questionnaire) => void;
    onViewInvitations: (questionnaire: Questionnaire) => void;
    onTest: (questionnaire: Questionnaire) => void;
}

export const createActions = ({
    onDetail,
    onEdit,
    onDuplicate,
    onDelete,
    onShare,
    onViewInvitations,
    onTest
}: CreateActionsProps): TableAction[] => [
    {
        label: "Ver detalle",
        icon: "pi pi-eye",
        className: "text-blue-500",
        onClick: (questionnaire: Questionnaire) => onDetail(questionnaire)
    },
    {
        label: "Editar",
        icon: "pi pi-pencil",
        className: "text-blue-500",
        onClick: (questionnaire: Questionnaire) => onEdit(questionnaire)
    },
    {
        label: "Duplicar",
        icon: "pi pi-copy",
        className: "text-purple-500",
        onClick: (questionnaire: Questionnaire) => onDuplicate(questionnaire)
    },
    {
        label: "Compartir link",
        icon: "pi pi-share-alt",
        className: "text-green-500",
        onClick: (questionnaire: Questionnaire) => onShare(questionnaire)
    },
    {
        label: "Ver invitaciones",
        icon: "pi pi-envelope",
        className: "text-orange-500",
        onClick: (questionnaire: Questionnaire) => onViewInvitations(questionnaire)
    },
    {
        label: "Testear",
        icon: "pi pi-check-square",
        className: "text-indigo-500",
        onClick: (questionnaire: Questionnaire) => onTest(questionnaire)
    },
    {
        label: "Eliminar",
        icon: "pi pi-trash",
        className: "text-red-500",
        onClick: (questionnaire: Questionnaire) => onDelete(questionnaire.id)
    }
]; 