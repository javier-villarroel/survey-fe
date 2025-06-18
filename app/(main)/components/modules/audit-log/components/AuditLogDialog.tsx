import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { AuditLogItem } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface AuditLogDialogProps {
    visible: boolean;
    onHide: () => void;
    selectedItem: AuditLogItem | null;
}

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Fecha no disponible';
    
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Fecha inválida';
        
        return formatDistanceToNow(date, { 
            addSuffix: true,
            locale: es 
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Error en fecha';
    }
};

export const AuditLogDialog: React.FC<AuditLogDialogProps> = ({
    visible,
    onHide,
    selectedItem
}) => {
    if (!selectedItem) return null;

    const timeAgo = formatDate(selectedItem.createdAt);

    const getEventSeverity = (event: string) => {
        switch (event.toLowerCase()) {
            case 'create':
                return 'success';
            case 'update':
                return 'warning';
            case 'delete':
                return 'danger';
            case 'read':
                return 'info';
            default:
                return 'info';
        }
    };

    const getEventLabel = (event: string) => {
        switch (event.toLowerCase()) {
            case 'create':
                return 'Crear';
            case 'update':
                return 'Modificar';
            case 'delete':
                return 'Eliminar';
            case 'read':
                return 'Ver';
            default:
                return event;
        }
    };

    const renderDataComparison = () => {
        if (!selectedItem.oldData && !selectedItem.newData) return null;

        return (
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-3">Cambios realizados</h3>
                <div className="grid">
                    <div className="col-6">
                        <h4 className="text-lg mb-2">Datos anteriores</h4>
                        <pre className="p-3 surface-ground border-round">
                            {JSON.stringify(selectedItem.oldData, null, 2)}
                        </pre>
                    </div>
                    <div className="col-6">
                        <h4 className="text-lg mb-2">Datos nuevos</h4>
                        <pre className="p-3 surface-ground border-round">
                            {JSON.stringify(selectedItem.newData, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Dialog
            header="Detalles de la actividad"
            visible={visible}
            onHide={onHide}
            style={{ width: '90vw', maxWidth: '1200px' }}
            modal
            className="p-fluid"
        >
            <div className="grid">
                <div className="col-12">
                    <div className="flex flex-column gap-3">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-user text-xl"></i>
                            <span className="font-bold">Usuario:</span>
                            <span>{selectedItem.newData?.firstName} {selectedItem.newData?.lastName}</span>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-envelope text-xl"></i>
                            <span className="font-bold">Correo:</span>
                            <span>{selectedItem.newData?.email}</span>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-clock text-xl"></i>
                            <span className="font-bold">Fecha:</span>
                            <span>{timeAgo}</span>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-info-circle text-xl"></i>
                            <span className="font-bold">Descripción:</span>
                            <span>{selectedItem.description}</span>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    {renderDataComparison()}
                </div>
            </div>
        </Dialog>
    );
}; 