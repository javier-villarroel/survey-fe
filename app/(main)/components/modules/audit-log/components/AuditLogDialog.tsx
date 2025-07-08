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
        groups: 'Grupos',
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
    
    // Manejo especial para grupos
    if (Array.isArray(value) && value.length > 0 && value[0]?.role) {
        return value.map((group, index) => (
            <div key={index} className="p-2 surface-100 border-round mb-2">
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-users text-primary"></i>
                    <span>{group.role?.name || 'Sin nombre'}</span>
                    {group.principal && (
                        <Tag severity="info" value="Principal" />
                    )}
                </div>
            </div>
        ));
    }

    // Manejo especial para roles individuales
    if (typeof value === 'object' && value !== null && 'role' in value) {
        return (
            <div className="p-2 surface-100 border-round">
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-user text-primary"></i>
                    <span>{value.role?.name || 'Sin nombre'}</span>
                    {value.principal && (
                        <Tag severity="info" value="Principal" />
                    )}
                </div>
            </div>
        );
    }

    // Manejo especial para objetos role
    if (typeof value === 'object' && value !== null && 'name' in value) {
        return (
            <div className="p-2 surface-100 border-round">
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-user text-primary"></i>
                    <span>{value.name || 'Sin nombre'}</span>
                    {value.color && (
                        <div 
                            className="border-round" 
                            style={{ 
                                width: '1rem', 
                                height: '1rem', 
                                backgroundColor: value.color 
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }

    if (value === 'ACTIVE') return 'Activo';
    if (value === 'INACTIVE') return 'Inactivo';
    if (value === 'SUSPENDED') return 'Suspendido';
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
        if (['id', 'createdAt', 'updatedAt'].includes(key)) return;

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
                                
                                {/* Contenido de la comparación */}
                                <div className="p-3 surface-ground">
                                    <div className="flex align-items-stretch gap-3">
                                        {/* Valor anterior */}
                                        {(change.type === 'modified' || change.type === 'removed') && (
                                            <div className="flex-1 bg-white border-round-lg p-0 shadow-1">
                                                <div className="bg-red-50 p-2 border-round-top flex align-items-center gap-2">
                                                    <i className="pi pi-history text-red-600"></i>
                                                    <span className="font-medium text-red-600">Valor anterior</span>
                                                </div>
                                                <div className="p-3 border-round-bottom">
                                                    {formatValue(change.oldValue)}
                                                </div>
                                            </div>
                                        )}

                                        {/* Flecha central - solo para modificaciones */}
                                        {change.type === 'modified' && (
                                            <div className="flex align-items-center">
                                                <div className="p-2 border-round bg-primary-50">
                                                    <i className="pi pi-arrow-right text-primary text-xl"></i>
                                                </div>
                                            </div>
                                        )}

                                        {/* Valor nuevo */}
                                        {(change.type === 'modified' || change.type === 'added') && (
                                            <div className="flex-1 bg-white border-round-lg p-0 shadow-1">
                                                <div className="bg-green-50 p-2 border-round-top flex align-items-center gap-2">
                                                    <i className="pi pi-check-circle text-green-600"></i>
                                                    <span className="font-medium text-green-600">Nuevo valor</span>
                                                </div>
                                                <div className="p-3 border-round-bottom">
                                                    {formatValue(change.newValue)}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {changes.length === 0 && (
                        <div className="col-12">
                            <div className="p-4 surface-ground border-round text-center">
                                <i className="pi pi-info-circle text-xl text-blue-500 mb-3"></i>
                                <div className="text-lg">No se encontraron cambios en los datos</div>
                            </div>
                        </div>
                    )}
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
                    {renderDataComparison()}
                </div>
            </div>
        </Dialog>
    );
}; 