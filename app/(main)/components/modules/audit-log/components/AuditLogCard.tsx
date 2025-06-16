'use client';

import React from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AuditLogItem } from '../types';

interface AuditLogCardProps {
    item: AuditLogItem;
    onClick: (item: AuditLogItem) => void;
    getModuleIcon: (module: string) => string;
}

export const AuditLogCard: React.FC<AuditLogCardProps> = ({
    item,
    onClick,
    getModuleIcon
}) => {
    const getActionSeverity = (action: string) => {
        switch (action.toLowerCase()) {
            case 'crear':
                return 'success';
            case 'modificar':
                return 'warning';
            case 'eliminar':
                return 'danger';
            case 'ver':
                return 'info';
            default:
                return 'info';
        }
    };

    return (
        <Card
            className="mb-4 border-left-3 surface-border cursor-pointer hover:shadow-lg"
            onClick={() => onClick(item)}
            style={{ width: '100%' }}
        >
            <div className="flex flex-col gap-2">
                {/* Grid: Nombre | Correo | Fecha | Módulo | Descripción | Acción */}
                <div
                    className="grid w-full items-center text-center"
                    style={{
                        gridTemplateColumns: 'minmax(140px,1fr) minmax(220px,2fr) 160px 160px 2fr 120px',
                        gap: '1rem',
                        alignItems: 'center',
                        justifyItems: 'center'
                    }}
                >
                    {/* Nombre */}
                    <span className="text-lg font-semibold truncate" title={item.user.name}>
                        {item.user.name}
                    </span>
                    {/* Correo */}
                    <span className="text-sm text-gray-500 truncate" title={item.user.email}>
                        {item.user.email}
                    </span>
                    {/* Fecha */}
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                        {format(new Date(item.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}
                    </span>
                    {/* Módulo */}
                    <span className="flex items-center gap-2 justify-center">
                        <i className={`${getModuleIcon(item.module)} text-xl`} />
                        <span className="font-medium">{item.module}</span>
                    </span>
                    {/* Descripción */}
                    <span className="text-gray-700 truncate">{item.description}</span>
                    {/* Acción */}
                    <span className="flex justify-center">
                        <Tag
                            value={item.action}
                            severity={getActionSeverity(item.action)}
                            className="action-tag"
                        />
                    </span>
                </div>
            </div>
        </Card>
    );
};