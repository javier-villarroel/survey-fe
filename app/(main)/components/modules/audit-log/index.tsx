'use client';

import React, { useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';
import { AuditLogHeader } from './components/AuditLogHeader';
import { AuditLogTimeline } from './components/AuditLogTimeline';
import { AuditLogDialog } from './components/AuditLogDialog';
import { useAuditLog } from './hooks/useAuditLog';
import { AuditLogItem } from './types';
import './styles.css';
import { ProgressSpinner } from 'primereact/progressspinner';

const pageSizeOptions = [
    { label: '5 por página', value: 5 },
    { label: '10 por página', value: 10 },
    { label: '20 por página', value: 20 }
];

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
        usersLoading,
        totalPages,
        hasNextPage,
        hasPrevPage
    } = useAuditLog();

    const [selectedItem, setSelectedItem] = useState<AuditLogItem | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    const onPageChange = (event: { first: number; rows: number; page: number }) => {
        setPage(event.page + 1);
    };

    const handlePageSizeChange = (e: { value: number }) => {
        setPageSize(e.value);
        setPage(1); // Reset to first page when changing page size
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
                    <div className="flex align-items-center justify-content-center gap-4">
                        <div className="flex align-items-center gap-2">
                            <span className="text-sm">Mostrar:</span>
                            <Dropdown
                                value={pageSize}
                                options={pageSizeOptions}
                                onChange={handlePageSizeChange}
                                className="w-auto"
                            />
                        </div>
                        <Paginator
                            first={(page - 1) * pageSize}
                            rows={pageSize}
                            totalRecords={pageSize * totalPages}
                            onPageChange={onPageChange}
                            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
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

