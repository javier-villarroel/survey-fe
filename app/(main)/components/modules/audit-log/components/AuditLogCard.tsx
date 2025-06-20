'use client';

import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { AuditLogItem } from '../types';
import { formatDistanceToNow, format } from 'date-fns';
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

interface FormattedDate {
    relative: string;
    exact: string;
}

const formatDate = (dateString: string | undefined): FormattedDate => {
    if (!dateString) return { relative: 'Fecha no disponible', exact: 'Fecha no disponible' };
    
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return { relative: 'Fecha inválida', exact: 'Fecha inválida' };
        
        return {
            relative: formatDistanceToNow(date, { 
                addSuffix: true,
                locale: es 
            }),
            exact: format(date, "dd/MM/yyyy hh:mm a", { locale: es })
        };
    } catch (error) {
        console.error('Error formatting date:', error);
        return { relative: 'Error en fecha', exact: 'Error en fecha' };
    }
};

export const AuditLogCard: React.FC<AuditLogCardProps> = ({ item, onClick }) => {
    const [formattedDate, setFormattedDate] = useState<FormattedDate>(formatDate(item.createdAt));

    useEffect(() => {
        const timer = setInterval(() => {
            setFormattedDate(formatDate(item.createdAt));
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
                        gridTemplateColumns: 'minmax(140px,1fr) minmax(220px,2fr) 200px 160px 2fr 120px',
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
                    <div className="flex flex-column align-items-center">
                        <span className="text-sm text-gray-700 font-medium">
                            {formattedDate.exact}
                        </span>
                        <span className="text-sm text-gray-500">
                            ({formattedDate.relative})
                        </span>
                    </div>
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