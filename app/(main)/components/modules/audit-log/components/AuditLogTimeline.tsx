'use client';

import React from 'react';
import { Timeline } from 'primereact/timeline';
import { AuditLogItem } from '../types';
import { 
    AuditModule, 
    AuditEvent, 
    ModuleTranslations, 
    EventTranslations, 
    ModuleIcons,
    EventIcons,
    EventColors,
    EventBackgroundColors,
    ModuleColors
} from '../constants/enums';
import { Tag } from 'primereact/tag';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Avatar } from 'primereact/avatar';

interface AuditLogTimelineProps {
    items: AuditLogItem[];
    onItemClick: (item: AuditLogItem) => void;
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

const getInitials = (firstName?: string, lastName?: string): string => {
    if (!firstName && !lastName) return '??';
    return `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`;
};

export const AuditLogTimeline: React.FC<AuditLogTimelineProps> = ({
    items,
    onItemClick
}) => {
    const customMarker = (item: AuditLogItem) => {
        const event = item.event as AuditEvent;
        const backgroundColor = EventBackgroundColors[event];
        
        return (
            <div className="flex align-items-center justify-content-center" 
                 style={{ 
                     width: '3rem', 
                     height: '3rem', 
                     backgroundColor,
                     borderRadius: '50%',
                     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                     transition: 'all 0.2s',
                     cursor: 'pointer',
                     border: '3px solid #ffffff'
                 }}>
                <i className={`${EventIcons[event]} text-white text-2xl`} />
            </div>
        );
    };

    const customContent = (item: AuditLogItem) => {
        const moduleType = item.module as AuditModule;
        const event = item.event as AuditEvent;
        const timeAgo = formatDate(item.createdAt);
        const moduleColor = ModuleColors[moduleType];
        const initials = getInitials(item.newData?.firstName, item.newData?.lastName);

        return (
            <div className="surface-card border-round shadow-1 mb-3 cursor-pointer hover:surface-hover transition-colors transition-duration-150"
                 onClick={() => onItemClick(item)}
                 style={{ 
                     borderLeft: `4px solid ${moduleColor}`,
                     marginLeft: '1rem'
                 }}>
                <div className="p-3">
                    {/* Encabezado con módulo, evento y tiempo */}
                    <div className="flex align-items-center justify-content-between mb-3">
                        <div className="flex align-items-center gap-2">
                            <i className={`${ModuleIcons[moduleType]} text-xl`} 
                               style={{ color: moduleColor }} />
                            <span className="font-medium text-900">{ModuleTranslations[moduleType]}</span>
                            <Tag value={EventTranslations[event]} 
                                 severity={EventColors[event]} 
                                 className="ml-2" />
                        </div>
                        <span className="text-sm text-500 font-medium">{timeAgo}</span>
                    </div>

                    {/* Contenido principal */}
                    <div className="grid">
                        {/* Columna izquierda: Usuario */}
                        <div className="col-12 md:col-4">
                            <div className="flex align-items-center gap-2">
                                <Avatar label={initials} 
                                        size="large" 
                                        shape="circle" 
                                        style={{ backgroundColor: moduleColor, color: '#ffffff' }} />
                                <div className="flex flex-column">
                                    <span className="font-semibold text-900">
                                        {item.newData?.firstName} {item.newData?.lastName}
                                    </span>
                                    <span className="text-500 text-sm">
                                        {item.newData?.email}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha: Descripción */}
                        <div className="col-12 md:col-8">
                            <div className="flex align-items-center h-full">
                                <p className="text-700 line-height-3 m-0">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Indicador de más información */}
                    <div className="flex justify-content-end align-items-center mt-3 pt-2 border-top-1 border-300">
                        <span className="text-sm text-500 font-medium flex align-items-center gap-1">
                            <i className="pi pi-info-circle"></i>
                            Click para ver más detalles
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full px-4">
            <Timeline
                value={items}
                align="left"
                className="customized-timeline w-full"
                marker={customMarker}
                content={customContent}
                pt={{
                    marker: { className: 'border-circle border-0 cursor-pointer hover:scale-110 transition-transform transition-duration-200' },
                    connector: { className: 'bg-primary-100' }
                }}
            />
        </div>
    );
}; 