'use client';

import React from 'react';
import { Timeline } from 'primereact/timeline';
import { Skeleton } from 'primereact/skeleton';
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
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Avatar } from 'primereact/avatar';

interface AuditLogTimelineProps {
    items: AuditLogItem[];
    onItemClick: (item: AuditLogItem) => void;
    loading?: boolean;
}

type StatusSeverity = 'success' | 'danger' | 'info';

interface StatusInfo {
    label: string;
    severity: StatusSeverity;
    icon: string;
    color: string;
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
            exact: format(date, "dd/MM/yyyy hh:mm a", { locale: es })
        };
    } catch (error) {
        return { relative: 'Error en fecha', exact: 'Error en fecha' };
    }
};

const getInitials = (firstName?: string, lastName?: string, email?: string): string => {
    // Si tenemos nombre y apellido, usamos esos
    if (firstName && lastName) {
        return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    }

    if (firstName) {
        return `${firstName[0].toUpperCase()}${firstName[1].toUpperCase()}`;
    }
    
    // Si tenemos email, usamos las dos primeras letras antes del @
    if (email) {
        const emailPrefix = email.split('@')[0];
        if (emailPrefix.length >= 2) {
            return emailPrefix.slice(0, 2).toUpperCase();
        }
        return emailPrefix[0].toUpperCase() + '?';
    }
    
    return '??';
};

const getStatusInfo = (status: string | undefined, event: AuditEvent): any => {
    if (!status) return { 
        label: 'Desconocido', 
        severity: 'info', 
        icon: 'pi pi-question-circle',
        color: '#6366F1' // Indigo para estado desconocido
    };
    
    if(event === 'LOGIN') {
        switch (status.toUpperCase() ) {
            case 'SUCCESS':
                return { 
                    label: 'Exitoso', 
                    severity: 'success',
                    icon: 'pi pi-lock-open',
                    color: '#22C55E' // Verde
                };
            case 'FAILED':
            case 'FALLIDO':
                return { 
                    label: 'Fallido', 
                    severity: 'danger',
                    icon: 'pi pi-lock',
                    color: '#EF4444' // Rojo
                };
            default:
                return { 
                    label: status, 
                    severity: 'info',
                    icon: 'pi pi-question-circle',
                    color: '#6366F1' // Indigo
                };
        }
    }
};

const getModuleIcon = (moduleType: AuditModule, status?: string): string => {
    if (moduleType === AuditModule.AUTH) {
        return status?.toUpperCase() === 'SUCCESS' ? 'pi pi-lock-open' : 'pi pi-lock';
    }
    return ModuleIcons[moduleType];
};

export const AuditLogTimeline: React.FC<AuditLogTimelineProps> = ({
    items,
    onItemClick,
    loading = false
}) => {
    const LoadingSkeleton = () => {
        return Array(3).fill(0).map((_, index) => (
            <div key={index} className="surface-card border-round shadow-1 mb-3" style={{ marginLeft: '4rem' }}>
                <div className="p-3">
                    {/* Header skeleton */}
                    <div className="flex flex-column sm:flex-row align-items-start sm:align-items-center justify-content-between mb-3 gap-2">
                        <div className="flex align-items-center gap-2">
                            <Skeleton width="2rem" height="2rem" className="mr-2" />
                            <Skeleton width="8rem" height="1.5rem" />
                            <Skeleton width="6rem" height="1.5rem" className="ml-2" />
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Skeleton width="8rem" height="1.2rem" />
                        </div>
                    </div>

                    {/* Content skeleton */}
                    <div className="grid">
                        <div className="col-12 md:col-4">
                            <div className="flex align-items-center gap-2 mb-2 md:mb-0">
                                <Skeleton shape="circle" size="3rem" />
                                <div className="flex flex-column gap-2">
                                    <Skeleton width="10rem" height="1rem" />
                                    <Skeleton width="8rem" height="1rem" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 md:col-8">
                            <div className="flex align-items-center h-full">
                                <div className="w-full">
                                    <Skeleton width="100%" height="2rem" className="mb-2" />
                                    <Skeleton width="80%" height="1rem" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer skeleton */}
                    <div className="flex justify-content-end align-items-center mt-3 pt-2 border-top-1 border-300">
                        <Skeleton width="12rem" height="1rem" />
                    </div>
                </div>
            </div>
        ));
    };

    if (loading) {
        return (
            <div className="w-full px-4">
                <LoadingSkeleton />
            </div>
        );
    }

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
                     cursor: 'pointer',
                     border: '3px solid #ffffff'
                 }}>
                <i className={`${EventIcons[event]} text-white text-2xl`} />
            </div>
        );
    };

    const customContent = (item: AuditLogItem) => {
        console.log(item.user)
        const moduleType = item.module as AuditModule;
        const event = item.event as AuditEvent;
        const { relative: timeAgo, exact: exactTime } = formatDate(item.createdAt);
        const moduleColor = ModuleColors[moduleType];
        
        // Determinar las iniciales basadas en el módulo y estado
        let initials;
        if (moduleType === AuditModule.AUTH && item.status === 'SUCCESS' ) {
            // Para AUTH exitoso, usar el email del newData
            initials = getInitials(undefined, undefined, item.user?.email);
        } else {
            // Para otros casos, usar firstName y lastName
            initials = getInitials(item.user?.name, item.user?.name);
        }

        // Obtener información del estado si es módulo AUTH
        const showStatus = moduleType === AuditModule.AUTH;
        const status = showStatus ? getStatusInfo(item.status || item.newData?.status, item.event) : null;

        // Obtener el ícono del módulo
        const moduleIcon = item.event === 'LOGIN' ? getModuleIcon(moduleType, item.status || item.newData?.status) : '';

        // Determinar el color del ícono
        const iconColor = moduleType === AuditModule.AUTH && status 
            ? status.color 
            : moduleColor;

        return (
            <div className="surface-card border-round shadow-1 mb-3 cursor-pointer hover:surface-hover"
                 onClick={() => onItemClick(item)}
                 style={{ 
                     borderLeft: `4px solid ${moduleColor}`,
                     marginLeft: '1rem'
                 }}>
                <div className="p-3">
                    {/* Encabezado con módulo, evento y tiempo */}
                    <div className="flex flex-column sm:flex-row align-items-start sm:align-items-center justify-content-between mb-3 gap-2">
                        <div className="flex align-items-center gap-2 flex-wrap">
                            <i className={`${moduleIcon} text-xl`} 
                               style={{ color: iconColor }} />
                            <span className="font-medium text-900">{ModuleTranslations[moduleType]}</span>
                            <Tag value={EventTranslations[event]} 
                                 severity={EventColors[event]} 
                                 className="ml-2" />
                            {showStatus && status && (
                                <Tag 
                                    icon={status.icon}
                                    value={status.label} 
                                    severity={status.severity}
                                    className="ml-2" 
                                />
                            )}
                        </div>
                        <div className="flex align-items-center gap-2">
                            <span className="text-sm text-500 font-medium">{exactTime}</span>
                            <span className="text-sm text-600 font-medium">({timeAgo})</span>
                        </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="grid">
                        {/* Columna izquierda: Usuario */}
                        <div className="col-12 md:col-4">
                            <div className="flex align-items-center gap-2 mb-2 md:mb-0">
                                <Avatar label={initials} 
                                        size="large" 
                                        shape="circle" 
                                        style={{ backgroundColor: moduleColor, color: '#ffffff' }} />
                                <div className="flex flex-column">
                                    <span className="font-semibold text-900 text-overflow-ellipsis overflow-hidden">
                                        {moduleType === AuditModule.AUTH && item.status === 'SUCCESS' 
                                            ? item.user?.email 
                                            : `${item.user?.firstName || ''} ${item.user?.lastName || ''}`}
                                    </span>
                                    <span className="text-500 text-sm text-overflow-ellipsis overflow-hidden">
                                        {moduleType === AuditModule.AUTH && item.status === 'SUCCESS' && item.event === 'LOGIN'
                                            ? 'Usuario autenticado'
                                            : item.user?.email}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha: Descripción */}
                        <div className="col-12 md:col-8">
                            <div className="flex align-items-center h-full">
                                <p className="text-700 line-height-3 m-0 text-break-word">
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