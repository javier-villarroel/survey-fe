'use client';

import React, { useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { AuditLogHeader } from './components/AuditLogHeader';
import { AuditLogTimeline } from './components/AuditLogTimeline';
import { AuditLogDialog } from './components/AuditLogDialog';
import { useAuditLog } from './hooks/useAuditLog';
import { AuditLogItem } from './types';
import './styles.css';
import { ProgressSpinner } from 'primereact/progressspinner';

export const AuditLog: React.FC = () => {
    const {
        items,
        users,
        loading,
        error,
        total,
        page,
        pageSize,
        startDate,
        endDate,
        selectedModule,
        selectedEvent,
        selectedUser,
        setPage,
        setPageSize,
        setDateRange,
        setSelectedModule,
        setSelectedEvent,
        setSelectedUser,
        usersLoading
    } = useAuditLog();

    const [selectedItem, setSelectedItem] = useState<AuditLogItem | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    const onPageChange = (event: { first: number; rows: number }) => {
        setPage(Math.floor(event.first / event.rows) + 1);
        setPageSize(event.rows);
    };

    const handleItemClick = (item: AuditLogItem) => {
        setSelectedItem(item);
        setDialogVisible(true);
    };

    if (error) {
        return (
            <div className="flex align-items-center justify-content-center">
                <div className="text-red-500">{error.message}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-column gap-4">
            <AuditLogHeader
                users={users}
                selectedUser={selectedUser}
                selectedModule={selectedModule}
                selectedEvent={selectedEvent}
                startDate={startDate}
                endDate={endDate}
                onUserChange={setSelectedUser}
                onModuleChange={setSelectedModule}
                onEventChange={setSelectedEvent}
                onDateRangeChange={setDateRange}
                usersLoading={usersLoading}
            />

            {loading ? (
                <div className="flex align-items-center justify-content-center p-5">
                    <ProgressSpinner />
                </div>
            ) : items.length === 0 ? (
                <div className="flex align-items-center justify-content-center p-5">
                    <p className="text-600">No hay registros que mostrar</p>
                </div>
            ) : (
                <div className="flex flex-column gap-3">
                    <AuditLogTimeline 
                        items={items} 
                        onItemClick={handleItemClick}
                    />
                    <div className="flex justify-content-center">
                        <Paginator
                            first={(page - 1) * pageSize}
                            rows={pageSize}
                            totalRecords={total}
                            onPageChange={onPageChange}
                            className="border-round-xl"
                        />
                    </div>
                </div>
            )}

            <AuditLogDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                selectedItem={selectedItem}
            />
        </div>
    );
}; 

