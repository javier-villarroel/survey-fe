import { TableAction } from "@/app/(main)/components/common/components/table/types";
import { Project } from "../../../services/types";

interface CreateActionsProps {
    onEdit: (project: Project) => void;
    onDelete: (projectId: string) => void;
    onToggleStatus: (project: Project) => void;
    onCreateQuestionnaire: (project: Project) => void;
    onRoleAssignment: (project: Project) => void;
}

export const createActions = ({ 
    onEdit, 
    onDelete, 
    onToggleStatus, 
    onCreateQuestionnaire,
    onRoleAssignment 
}: CreateActionsProps): TableAction[] => [
    {
        label: "Editar",
        icon: "pi pi-pencil",
        className: "text-blue-500",
        onClick: (project: Project) => onEdit(project)
    },
    {
        label: "Eliminar",
        icon: "pi pi-trash",
        className: "text-red-500",
        onClick: (project: Project) => onDelete(project.id)
    },
    {
        label: "Cambiar estado",
        icon: "pi pi-refresh",
        className: "text-yellow-500",
        getLabel: (project: Project) => project.status === 'active' ? "Desactivar" : "Activar",
        getIcon: (project: Project) => project.status === 'active' ? "pi pi-ban" : "pi pi-check",
        getClassName: (project: Project) => project.status === 'active' ? "text-red-500" : "text-green-500",
        onClick: (project: Project) => onToggleStatus(project)
    },
    {
        label: "Crear Cuestionario",
        icon: "pi pi-file-edit",
        className: "text-purple-500",
        onClick: (project: Project) => onCreateQuestionnaire(project)
    },
    {
        label: "Bitacora",
        icon: "pi pi-history",
        className: "text-orange-500",
        onClick: (project: Project) => onCreateQuestionnaire(project)
    },
    {
        label: "Asignación de roles",
        icon: "pi pi-users",
        className: "text-indigo-500",
        onClick: (project: Project) => onRoleAssignment(project)
    }
]; 