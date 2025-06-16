import React from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getActionIcon, getModuleIcon } from '../utils/icons';

interface AuditLogCardProps {
    item: any;
    onClick: (item: any) => void;
}

export const AuditLogCard: React.FC<AuditLogCardProps> = ({ item, onClick }) => {
    return (
        <Card 
            className="mb-4 border-left-3 surface-border cursor-pointer hover:shadow-lg" 
            onClick={() => onClick(item)}
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <div className="text-lg font-semibold">{item.user.name}</div>
                        <div className="text-sm text-gray-500">{item.user.email}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                        {format(new Date(item.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <i className={`${getModuleIcon(item.module)} text-xl`} />
                    <span className="font-medium">{item.module}</span>
                    <Divider layout="vertical" />
                    <Tag 
                        value={item.action} 
                        severity={
                            item.action.toLowerCase() === 'crear' ? 'success' :
                            item.action.toLowerCase() === 'modificar' ? 'warning' :
                            item.action.toLowerCase() === 'eliminar' ? 'danger' :
                            'info'
                        }
                        className="action-tag"
                    />
                </div>
                <p className="text-gray-700 m-0">{item.description}</p>
            </div>
        </Card>
    );
}; 