'use client';

import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { AuditLogItem } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
    AuditModule, 
    AuditEvent, 
    ModuleTranslations, 
    EventTranslations, 
    ModuleIcons,
    EventColors 
} from '../constants/enums';

interface AuditLogCardProps {
    item: AuditLogItem;
    onClick: (item: AuditLogItem) => void;
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

export const AuditLogCard: React.FC<AuditLogCardProps> = ({ item, onClick }) => {
    const [timeAgo, setTimeAgo] = useState<string>(formatDate(item.createdAt));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeAgo(formatDate(item.createdAt));
        }, 60000); // Actualizar cada minuto

        return () => clearInterval(timer);
    }, [item.createdAt]);

    const moduleType = item.module as AuditModule;
    const event = item.event as AuditEvent;

    return (
        <Card
            className="mb-4 border-left-3 surface-border cursor-pointer hover:shadow-lg"
            onClick={() => onClick(item)}
            style={{ width: '100%' }}
        >
            <div className="flex flex-col gap-2">
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
                    <span className="text-lg font-semibold truncate" title={item.newData?.firstName}>
                        {item.newData?.firstName} {item.newData?.lastName}
                    </span>
                    {/* Correo */}
                    <span className="text-sm text-gray-500 truncate" title={item.newData?.email}>
                        {item.newData?.email}
                    </span>
                    {/* Fecha */}
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                        {timeAgo}
                    </span>
                    {/* Módulo */}
                    <span className="flex items-center gap-2 justify-center">
                        <i className={`${ModuleIcons[moduleType]} text-xl`} />
                        <span className="font-medium">{ModuleTranslations[moduleType]}</span>
                    </span>
                    {/* Descripción */}
                    <span className="text-gray-700 truncate">{item.description}</span>
                    {/* Evento */}
                    <span className="flex justify-center">
                        <Tag
                            value={EventTranslations[event]}
                            severity={EventColors[event]}
                            className="action-tag"
                        />
                    </span>
                </div>
            </div>
        </Card>
    );
};