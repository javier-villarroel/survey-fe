'use client';

import React from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
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
            style={{ width: '105%' }}
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                        <div className="text-lg font-semibold truncate" style={{ maxWidth: '200px' }}>{item.user.name}</div>
                        <span className="text-sm text-gray-500 whitespace-nowrap" style={{ marginRight: '2rem' }}>
                            ({item.user.email})
                        </span>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                        {format(new Date(item.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}
                    </div>
                </div>
                <div className="flex items-center w-full">
                    {/* Izquierda */}
                    <div className="flex items-center gap-2 flex-1">
                        <i className={`${getModuleIcon(item.module)} text-xl`} />
                        <span className="font-medium">{item.module}</span>
                    </div>
                    {/* Divider centrado */}
                    <div className="flex items-center justify-center" style={{ minWidth: 0 }}>
                        {/* <Divider layout="vertical" className="h-8" /> */}
                    </div>
                    {/* Derecha */}
                    <div className="flex items-center gap-2 flex-1 justify-end">
                        <Tag 
                            value={item.action} 
                            severity={getActionSeverity(item.action)}
                            className="action-tag"
                        />
                        <span className="text-gray-700 m-0">{item.description}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};