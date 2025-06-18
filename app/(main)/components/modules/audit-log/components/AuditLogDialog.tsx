'use client';

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { AuditLogItem } from '../types';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
    AuditModule, 
    AuditEvent, 
    ModuleTranslations, 
    EventTranslations, 
    EventColors 
} from '../constants/enums';

interface AuditLogDialogProps {
    visible: boolean;
    onHide: () => void;
    selectedItem: AuditLogItem | null;
}

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return { relative: 'Fecha no disponible', exact: 'Fecha no disponible' };
    
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return { relative: 'Fecha inválida', exact: 'Fecha inválida' };
        
        return {
            relative: formatDistanceToNow(date, { 
                addSuffix: true,
                locale: es 
            }),
            exact: format(date, "dd/MM/yyyy HH:mm:ss", { locale: es })
        };
    } catch (error) {
        console.error('Error formatting date:', error);
        return { relative: 'Error en fecha', exact: 'Error en fecha' };
    }
};

const getStatusTranslation = (status: string | undefined) => {
    if (!status) return 'Desconocido';
    switch (status.toUpperCase()) {
        case 'SUCCESS':
            return 'Exitoso';
        case 'FAILED':
        case 'FALLIDO':
            return 'Fallido';
        default:
            return status;
    }
};

export const AuditLogDialog: React.FC<AuditLogDialogProps> = ({
    visible,
    onHide,
    selectedItem
}) => {
    if (!selectedItem) return null;

    const { relative: timeAgo, exact: exactTime } = formatDate(selectedItem.createdAt);
    const moduleType = selectedItem.module as AuditModule;
    const event = selectedItem.event as AuditEvent;

    const renderAuthContent = () => {
        if (!selectedItem.newData) return null;

        const message = selectedItem.newData.message || selectedItem.description;
        const status = selectedItem.status || selectedItem.newData.status;
        const isSuccess = status === 'SUCCESS';
        const severity = isSuccess ? 'success' : 'danger';
        const statusText = getStatusTranslation(status);

        return (
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-3">Detalles de la autenticación</h3>
                <div className="p-4 surface-ground border-round">
                    <div className="flex flex-column gap-3">
                        <div className="flex align-items-center gap-2">
                            <i className={`pi ${isSuccess ? 'pi-check-circle text-green-500' : 'pi-times-circle text-red-500'} text-xl`}></i>
                            <Tag value={statusText} severity={severity} />
                        </div>
                        <div className="text-lg">{message}</div>
                        {selectedItem.oldData?.email && (
                            <div className="flex align-items-center gap-2 text-600">
                                <i className="pi pi-user text-lg"></i>
                                <span>{selectedItem.oldData.email}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
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
                        {selectedItem.newData?.firstName && (
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-user text-xl"></i>
                                <span className="font-bold">Usuario:</span>
                                <span>{selectedItem.newData?.firstName} {selectedItem.newData?.lastName}</span>
                            </div>
                        )}
                        {selectedItem.newData?.email && (
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-envelope text-xl"></i>
                                <span className="font-bold">Correo:</span>
                                <span>{selectedItem.newData?.email}</span>
                            </div>
                        )}
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-clock text-xl"></i>
                            <span className="font-bold">Fecha:</span>
                            <span>{exactTime}</span>
                            <span className="text-500">({timeAgo})</span>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag text-xl"></i>
                            <span className="font-bold">Módulo:</span>
                            <span>{ModuleTranslations[moduleType]}</span>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-info-circle text-xl"></i>
                            <span className="font-bold">Evento:</span>
                            <Tag value={EventTranslations[event]} severity={EventColors[event]} />
                        </div>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-comment text-xl"></i>
                            <span className="font-bold">Descripción:</span>
                            <span>{selectedItem.description}</span>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    {moduleType === AuditModule.AUTH ? renderAuthContent() : renderDataComparison()}
                </div>
            </div>
        </Dialog>
    );
}; 