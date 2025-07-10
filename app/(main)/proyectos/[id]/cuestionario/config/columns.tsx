import { TableColumn } from "@/app/(main)/components/common/components/table/types";
import { Questionnaire } from "../types";

const statusBodyTemplate = (questionnaire: Questionnaire) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'active':
                return {
                    text: 'Activo',
                    className: 'bg-green-50 text-green-700 ring-green-600/20'
                };
            case 'draft':
                return {
                    text: 'Borrador',
                    className: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                };
            case 'completed':
                return {
                    text: 'Completado',
                    className: 'bg-blue-50 text-blue-700 ring-blue-600/20'
                };
            default:
                return {
                    text: status,
                    className: 'bg-gray-50 text-gray-700 ring-gray-600/20'
                };
        }
    };

    const config = getStatusConfig(questionnaire.status);
    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}
        >
            {config.text}
        </span>
    );
};

const dateBodyTemplate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const columns: TableColumn[] = [
    {
        field: 'title',
        header: 'Título',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por título',
        style: { minWidth: '14rem', padding: '1rem' }
    },
    {
        field: 'status',
        header: 'Estado',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por estado',
        body: statusBodyTemplate,
        style: { minWidth: '10rem', padding: '1rem' }
    },
    {
        field: 'totalQuestions',
        header: 'Total de Preguntas',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por total',
        style: { minWidth: '10rem', padding: '1rem' }
    },
    {
        field: 'createdAt',
        header: 'Fecha de Creación',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por fecha',
        body: (rowData: Questionnaire) => dateBodyTemplate(rowData.createdAt),
        style: { minWidth: '12rem', padding: '1rem' }
    },
    {
        field: 'updatedAt',
        header: 'Última Actualización',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por fecha',
        body: (rowData: Questionnaire) => dateBodyTemplate(rowData.updatedAt),
        style: { minWidth: '12rem', padding: '1rem' }
    }
]; 