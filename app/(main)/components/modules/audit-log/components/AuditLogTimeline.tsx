'use client';

import React from 'react';
import { Timeline } from 'primereact/timeline';
import { AuditLogCard } from './AuditLogCard';
import { AuditLogItem } from '../types';

interface AuditLogTimelineProps {
    items: AuditLogItem[];
    onItemClick: (item: AuditLogItem) => void;
    getActionIcon: (action: string) => string;
    getModuleIcon: (module: string) => string;
}

export const AuditLogTimeline: React.FC<AuditLogTimelineProps> = ({
    items,
    onItemClick,
    getActionIcon,
    getModuleIcon
}) => {
    const customizedMarker = (item: AuditLogItem) => {
        return (
            <div className="flex items-center justify-center" style={{ marginLeft: '16px' }}>
                <i className={`${getActionIcon(item.action)} text-2xl`} />
            </div>
        );
    };

    const customizedContent = (item: AuditLogItem) => {
        return (
            <AuditLogCard
                item={item}
                onClick={() => onItemClick(item)}
                getModuleIcon={getModuleIcon}
            />
        );
    };

    return (
        <div className="w-full">
            <Timeline 
                value={items} 
                align="left"
                className="customized-timeline"
                marker={customizedMarker}
                content={customizedContent}
                pt={{
                    content: {
                        className: 'p-0'
                    },
                    marker: {
                        className: 'border-none bg-transparent'
                    },
                    connector: {
                        className: 'bg-gray-200'
                    }
                }}
            />
        </div>
    );
}; 