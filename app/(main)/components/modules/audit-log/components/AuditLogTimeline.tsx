import React from 'react';
import { Timeline } from 'primereact/timeline';
import { AuditLogCard } from './AuditLogCard';
import { getActionIcon } from '../utils/icons';

interface AuditLogTimelineProps {
    items: any[];
    onItemClick: (item: any) => void;
}

export const AuditLogTimeline: React.FC<AuditLogTimelineProps> = ({
    items,
    onItemClick
}) => {
    const customizedMarker = (item: any) => {
        return (
            <span className="flex w-8 h-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                <i className={getActionIcon(item.action)} />
            </span>
        );
    };

    const customizedContent = (item: any) => {
        return <AuditLogCard item={item} onClick={onItemClick} />;
    };

    return (
        <div className="w-full">
            <Timeline 
                value={items} 
                align="left"
                className="customized-timeline"
                marker={customizedMarker}
                content={customizedContent}
            />
        </div>
    );
}; 