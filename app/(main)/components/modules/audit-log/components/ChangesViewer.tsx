'use client';

import React from 'react';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { Chip } from 'primereact/chip';

interface ChangeViewerProps {
    oldData: any;
    newData: any;
}

const ChangesViewer: React.FC<ChangeViewerProps> = ({ oldData, newData }) => {
    const getChanges = () => {
        const changes: any[] = [];
        const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);

        allKeys.forEach(key => {
            const oldValue = oldData[key];
            const newValue = newData[key];

            // Ignorar campos que no han cambiado
            if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
                return;
            }

            // Manejo especial para ciertos campos
            switch (key) {
                case 'role':
                    if (newValue?.name !== oldValue?.name) {
                        changes.push({
                            field: 'Rol',
                            oldValue: oldValue?.name || 'Sin rol',
                            newValue: newValue?.name || 'Sin rol',
                            type: 'role'
                        });
                    }
                    break;
                case 'action':
                    changes.push({
                        field: 'Acción',
                        oldValue: oldValue === 'UNASSIGN' ? 'Desasignado' : oldValue,
                        newValue: newValue === 'ASSIGN' ? 'Asignado' : newValue,
                        type: 'action'
                    });
                    break;
                case 'status':
                    changes.push({
                        field: 'Estado',
                        oldValue: oldValue === 'ACTIVE' ? 'Activo' : 'Inactivo',
                        newValue: newValue === 'ACTIVE' ? 'Activo' : 'Inactivo',
                        type: 'status'
                    });
                    break;
                case 'groups':
                    // Solo mostrar cambios en grupos si es relevante
                    if (newValue?.length !== oldValue?.length) {
                        changes.push({
                            field: 'Grupos',
                            oldValue: oldValue?.length || 0,
                            newValue: newValue?.length || 0,
                            type: 'groups'
                        });
                    }
                    break;
                case 'twoFactorAuth':
                    changes.push({
                        field: 'Autenticación de dos factores',
                        oldValue: oldValue ? 'Activado' : 'Desactivado',
                        newValue: newValue ? 'Activado' : 'Desactivado',
                        type: 'twoFactor'
                    });
                    break;
                default:
                    // Para campos básicos como nombre, email, etc.
                    if (oldValue !== newValue) {
                        changes.push({
                            field: getFieldLabel(key),
                            oldValue,
                            newValue,
                            type: 'default'
                        });
                    }
            }
        });

        return changes;
    };

    const getFieldLabel = (key: string) => {
        const labels: { [key: string]: string } = {
            firstName: 'Nombre',
            lastName: 'Apellido',
            email: 'Correo electrónico',
            phone: 'Teléfono'
        };
        return labels[key] || key;
    };

    const getStatusSeverity = (status: string) => {
        return status === 'ACTIVE' || status === 'Activo' ? 'success' : 'danger';
    };

    const renderValue = (change: any) => {
        switch (change.type) {
            case 'status':
                return (
                    <Badge 
                        value={change.newValue} 
                        severity={getStatusSeverity(change.newValue)}
                    />
                );
            case 'role':
                return (
                    <Chip 
                        label={change.newValue}
                        className="bg-primary"
                    />
                );
            case 'action':
                return (
                    <Badge 
                        value={change.newValue}
                        severity={change.newValue === 'Asignado' ? 'success' : 'warning'}
                    />
                );
            default:
                return change.newValue;
        }
    };

    const renderOldValue = (change: any) => {
        switch (change.type) {
            case 'status':
                return (
                    <Badge 
                        value={change.oldValue} 
                        severity={getStatusSeverity(change.oldValue)}
                    />
                );
            case 'role':
                return (
                    <Chip 
                        label={change.oldValue}
                        className="bg-gray-500"
                    />
                );
            case 'action':
                return (
                    <Badge 
                        value={change.oldValue}
                        severity={change.oldValue === 'Asignado' ? 'success' : 'warning'}
                    />
                );
            default:
                return change.oldValue;
        }
    };

    const changes = getChanges();

    return (
        <div className="card">
            <h5>Cambios Realizados</h5>
            <div className="grid">
                {changes.map((change, index) => (
                    <div key={index} className="col-12 md:col-6">
                        <Card className="mb-3">
                            <div className="flex flex-column gap-3">
                                <div className="text-lg font-medium">{change.field}</div>
                                <div className="flex align-items-center gap-3">
                                    <div className="flex flex-column gap-2">
                                        <span className="text-sm text-500">Valor anterior</span>
                                        <div className="flex align-items-center gap-2">
                                            {renderOldValue(change)}
                                        </div>
                                    </div>
                                    <i className="pi pi-arrow-right text-500"></i>
                                    <div className="flex flex-column gap-2">
                                        <span className="text-sm text-500">Nuevo valor</span>
                                        <div className="flex align-items-center gap-2">
                                            {renderValue(change)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChangesViewer; 