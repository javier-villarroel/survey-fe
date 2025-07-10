import { TableColumn } from "@/app/(main)/components/common/components/table/types";
import { Participant } from "../types";

const statusBodyTemplate = (participant: Participant) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'completed':
                return {
                    text: 'Completado',
                    className: 'bg-green-50 text-green-700 ring-green-600/20'
                };
            case 'sent':
                return {
                    text: 'Enviado',
                    className: 'bg-blue-50 text-blue-700 ring-blue-600/20'
                };
            case 'pending':
                return {
                    text: 'Pendiente',
                    className: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                };
            default:
                return {
                    text: status,
                    className: 'bg-gray-50 text-gray-700 ring-gray-600/20'
                };
        }
    };

    const config = getStatusConfig(participant.status);
    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}
        >
            {config.text}
        </span>
    );
};

const dateBodyTemplate = (date: string | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const columns: TableColumn[] = [
    {
        field: 'firstName',
        header: 'Nombre',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por nombre',
        style: { minWidth: '12rem', padding: '1rem' }
    },
    {
        field: 'lastName',
        header: 'Apellido',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por apellido',
        style: { minWidth: '12rem', padding: '1rem' }
    },
    {
        field: 'email',
        header: 'Email',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por email',
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
        field: 'invitationDate',
        header: 'Fecha de Invitación',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por fecha',
        body: (rowData: Participant) => dateBodyTemplate(rowData.invitationDate),
        style: { minWidth: '12rem', padding: '1rem' }
    },
    {
        field: 'completionDate',
        header: 'Fecha de Completado',
        sortable: true,
        filter: true,
        filterPlaceholder: 'Filtrar por fecha',
        body: (rowData: Participant) => dateBodyTemplate(rowData.completionDate),
        style: { minWidth: '12rem', padding: '1rem' }
    }
]; 