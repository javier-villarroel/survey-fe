'use client';

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { AuditLogItem } from '../types';
import { formatDistanceToNow, format, isValid } from 'date-fns';
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

const getFieldLabel = (key: string): string => {
    const labels: { [key: string]: string } = {
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        status: 'Estado',
        role: 'Rol',
        action: 'Acción',
        twoFactorAuth: 'Autenticación de dos factores',
        name: 'Nombre',
        description: 'Descripción',
        startDate: 'Fecha de inicio',
        endDate: 'Fecha de fin',
        createdAt: 'Fecha de creación',
        updatedAt: 'Fecha de actualización',
        principal: 'Principal',
        color: 'Color',
        level: 'Nivel'
    };
    return labels[key] || key;
};

const formatDate = (dateString: string | undefined | null): string => {
    if (!dateString) return 'No definido';
    
    try {
        const date = new Date(dateString);
        if (!isValid(date)) return 'Fecha inválida';
        
        return format(date, 'dd/MM/yyyy', { locale: es });
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Fecha inválida';
    }
};

const formatDateWithTime = (dateString: string | undefined | null): string => {
    if (!dateString) return 'No definido';
    
    try {
        const date = new Date(dateString);
        if (!isValid(date)) return 'Fecha inválida';
        
        return format(date, "dd/MM/yyyy hh:mm a", { locale: es });
    } catch (error) {
        console.error('Error al formatear fecha y hora:', error);
        return 'Fecha inválida';
    }
};

const getTimeAgo = (dateString: string | undefined | null): string => {
    if (!dateString) return 'Fecha no disponible';
    
    try {
        const date = new Date(dateString);
        if (!isValid(date)) return 'Fecha inválida';
        
        return formatDistanceToNow(date, { addSuffix: true, locale: es });
    } catch (error) {
        console.error('Error al calcular tiempo transcurrido:', error);
        return 'Fecha inválida';
    }
};

const formatValue = (value: any): string | React.ReactNode => {
    if (value === null || value === undefined) return 'No definido';
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';

    // Traducciones de estados
    if (value === 'ACTIVE') return 'Activo';
    if (value === 'INACTIVE') return 'Inactivo';
    if (value === 'SUSPENDED') return 'Suspendido';
    if (value === 'DELETED') return 'Eliminado';
    if (value === 'ASSIGN') return 'Asignado';
    if (value === 'UNASSIGN') return 'Desasignado';
    
    // Manejo de fechas
    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
        return formatDate(value);
    }

    return String(value);
};

const getChangedFields = (oldData: any, newData: any) => {
    const changes: { key: string; oldValue: any; newValue: any; type: 'added' | 'removed' | 'modified' }[] = [];
    const allKeys = new Set([...Object.keys(oldData || {}), ...Object.keys(newData || {})]);

    allKeys.forEach(key => {
        // Ignorar campos específicos
        if (['id', 'createdAt', 'updatedAt', 'groups', 'lastLogin', 'roleId', 'role'].includes(key)) return;

        const oldValue = oldData?.[key];
        const newValue = newData?.[key];

        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
            let type: 'added' | 'removed' | 'modified';
            
            if (!oldData?.hasOwnProperty(key)) type = 'added';
            else if (!newData?.hasOwnProperty(key)) type = 'removed';
            else type = 'modified';

            changes.push({
                key,
                oldValue,
                newValue,
                type
            });
        }
    });

    return changes;
};

export const AuditLogDialog: React.FC<AuditLogDialogProps> = ({
    visible,
    onHide,
    selectedItem
}) => {
    if (!selectedItem) return null;

    const timeAgo = getTimeAgo(selectedItem.createdAt);
    const exactTime = formatDateWithTime(selectedItem.createdAt);
    const moduleType = selectedItem.module as AuditModule;
    const event = selectedItem.event as AuditEvent;

    const renderDataComparison = () => {
        if (!selectedItem.oldData && !selectedItem.newData) return null;

        const changes = getChangedFields(selectedItem.oldData, selectedItem.newData);

        return (
            <div className="mt-4">
                <div className="flex align-items-center gap-2 mb-3">
                    <i className="pi pi-sync text-xl text-primary"></i>
                    <h3 className="text-xl font-semibold m-0">Cambios realizados</h3>
                </div>
                <div className="grid">
                    {changes.map((change, index) => (
                        <div key={index} className="col-12 mb-3">
                            <div className="border-round shadow-2 overflow-hidden">
                                {/* Encabezado del campo */}
                                <div className={`p-3 ${
                                    change.type === 'added' 
                                        ? 'bg-green-600' 
                                        : change.type === 'removed' 
                                            ? 'bg-red-600' 
                                            : 'bg-primary'
                                }`}>
                                    <div className="flex align-items-center justify-content-between">
                                        <div className="text-lg font-medium text-white flex align-items-center gap-2">
                                            <i className={`pi ${
                                                change.type === 'added' 
                                                    ? 'pi-plus-circle' 
                                                    : change.type === 'removed' 
                                                        ? 'pi-minus-circle' 
                                                        : 'pi-sync'
                                            }`}></i>
                                            {getFieldLabel(change.key)}
                                        </div>
                                        <Tag 
                                            value={
                                                change.type === 'added' 
                                                    ? 'Agregado' 
                                                    : change.type === 'removed' 
                                                        ? 'Eliminado' 
                                                        : 'Modificado'
                                            } 
                                            severity={
                                                change.type === 'added' 
                                                    ? 'success' 
                                                    : change.type === 'removed' 
                                                        ? 'danger' 
                                                        : 'info'
                                            }
                                        />
                                    </div>
                                </div>
                                {/* Contenido del cambio */}
                                <div className="p-3 surface-ground">
                                    <div className="grid">
                                        {change.type !== 'added' && (
                                            <div className="col-12 md:col-5">
                                                <div className="p-3 surface-card border-round">
                                                    <div className="text-500 mb-2">Valor anterior</div>
                                                    <div>{formatValue(change.oldValue)}</div>
                                                </div>
                                            </div>
                                        )}
                                        {change.type === 'modified' && (
                                            <div className="col-12 md:col-2 flex align-items-center justify-content-center">
                                                <div className="flex align-items-center justify-content-center w-3rem h-3rem border-circle bg-primary">
                                                    <i className="pi pi-arrow-right text-xl text-white"></i>
                                                </div>
                                            </div>
                                        )}
                                        {change.type !== 'removed' && (
                                            <div className="col-12 md:col-5">
                                                <div className="p-3 surface-card border-round">
                                                    <div className="text-500 mb-2">Valor nuevo</div>
                                                    <div>{formatValue(change.newValue)}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header="Detalle de la Auditoría"
            style={{ width: '90vw', maxWidth: '1200px' }}
            modal
            className="p-fluid"
        >
            <div className="surface-section p-4">
                {/* Encabezado */}
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <div className="flex align-items-center gap-3 mb-3 md:mb-0">
                        <Tag 
                            value={EventTranslations[event]} 
                            severity={EventColors[event]}
                            className="text-lg"
                        />
                        <span className="text-xl font-medium">{ModuleTranslations[moduleType]}</span>
                    </div>
                    <div className="flex flex-column align-items-end">
                        <span className="text-lg">{exactTime}</span>
                        <span className="text-500">({timeAgo})</span>
                    </div>
                </div>

                 {/* Información del usuario que realizó la acción */}
                <div className="mt-4">
                    <div className="flex align-items-center gap-2 mb-3">
                        <i className="pi pi-user text-xl text-primary"></i>
                        <h3 className="text-xl font-semibold m-0">Usuario que realizó la acción</h3>
                    </div>
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div className="p-3 surface-ground border-round">
                                <div className="text-500 mb-2">Nombre</div>
                                <div className="text-900">{selectedItem.user.name}</div>
                            </div>
                        </div>
                        <div className="col-12 md:col-6">
                            <div className="p-3 surface-ground border-round">
                                <div className="text-500 mb-2">Correo electrónico</div>
                                <div className="text-900">{selectedItem.user.email}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Usuario afectado */}
                {selectedItem.newData && (
                    <div className="mt-4">
                        <div className="flex align-items-center gap-2 mb-3">
                            <i className="pi pi-user-edit text-xl text-primary"></i>
                            <h3 className="text-xl font-semibold m-0">Registro afectado - {ModuleTranslations[moduleType]}</h3>
                        </div>
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <div className="p-3 surface-ground border-round">
                                    <div className="text-500 mb-2">ID</div>
                                    <div className="text-900">{selectedItem.newData.id}</div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="p-3 surface-ground border-round">
                                    <div className="text-500 mb-2">Correo electrónico</div>
                                    <div className="text-900">{selectedItem.newData.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

               

                {/* Detalles del evento */}
                <div className="mt-4">
                    <div className="flex align-items-center gap-2 mb-3">
                        <i className="pi pi-info-circle text-xl text-primary"></i>
                        <h3 className="text-xl font-semibold m-0">Detalles del evento</h3>
                    </div>
                    <div className="grid">
                        <div className="col-12">
                            <div className="p-3 surface-ground border-round">
                                <div className="text-500 mb-2">Descripción</div>
                                <div className="text-900">{selectedItem.description}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparación de datos */}
                {renderDataComparison()}
            </div>
        </Dialog>
    );
}; 