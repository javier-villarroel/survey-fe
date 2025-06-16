'use client';

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import { AuditLogHeader } from './components/AuditLogHeader';
import { AuditLogTimeline } from './components/AuditLogTimeline';
import { AuditLogDialog } from './components/AuditLogDialog';
import { useAuditLog } from './hooks/useAuditLog';
import { AuditLogItem } from './types';
import './styles.css';

export const AuditLog: React.FC = () => {
    const {
        items,
        users,
        selectedUser,
        selectedAction,
        selectedModule,
        loading,
        error,
        total,
        page,
        pageSize,
        startDate,
        endDate,
        setSelectedUser,
        setSelectedAction,
        setSelectedModule,
        setPage,
        setPageSize,
        setDateRange
    } = useAuditLog();

    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<AuditLogItem | null>(null);

    const onPageChange = (event: { first: number; rows: number }) => {
        setPage(Math.floor(event.first / event.rows) + 1);
        setPageSize(event.rows);
    };

    const getActionIcon = (action: string) => {
        switch (action.toLowerCase()) {
            case 'crear':
                return 'pi pi-plus-circle text-green-500';
            case 'modificar':
                return 'pi pi-pencil text-yellow-500';
            case 'eliminar':
                return 'pi pi-trash text-red-500';
            case 'ver':
                return 'pi pi-eye text-blue-500';
            default:
                return 'pi pi-info-circle text-gray-500';
        }
    };

    const getModuleIcon = (module: string) => {
        switch (module.toLowerCase()) {
            case 'encuestas':
                return 'pi pi-file-edit text-indigo-500';
            case 'usuarios':
                return 'pi pi-users text-cyan-500';
            case 'preguntas':
                return 'pi pi-question-circle text-purple-500';
            case 'respuestas':
                return 'pi pi-check-square text-teal-500';
            case 'reportes':
                return 'pi pi-chart-bar text-orange-500';
            default:
                return 'pi pi-folder text-gray-500';
        }
    };

    const handleItemClick = (item: AuditLogItem) => {
        setSelectedItem(item);
        setVisible(true);
    };

    if (error) {
        return (
            <div className="p-2 sm:p-4">
                <Card>
                    <div className="text-red-500">Error al cargar los datos: {error.message}</div>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-2 sm:p-4">
            <Card>
                <AuditLogHeader
                    users={users}
                    selectedUser={selectedUser}
                    onUserChange={setSelectedUser}
                    startDate={startDate}
                    endDate={endDate}
                    onDateChange={setDateRange}
                    selectedAction={selectedAction}
                    onActionChange={setSelectedAction}
                    selectedModule={selectedModule}
                    onModuleChange={setSelectedModule}
                />
                <div className="flex flex-col gap-4">
                    {loading ? (
                        <div className="flex justify-content-center">
                            <i className="pi pi-spin pi-spinner text-4xl" />
                        </div>
                    ) : (
                        <AuditLogTimeline
                            items={items}
                            onItemClick={handleItemClick}
                            getActionIcon={getActionIcon}
                            getModuleIcon={getModuleIcon}
                        />
                    )}
                </div>
                <div className="flex justify-content-center mt-6 border-t pt-4">
                    <Paginator
                        first={(page - 1) * pageSize}
                        rows={pageSize}
                        totalRecords={total}
                        rowsPerPageOptions={[10, 20, 50]}
                        onPageChange={onPageChange}
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        className="border-none"
                    />
                </div>
            </Card>
            <AuditLogDialog
                visible={visible}
                onHide={() => setVisible(false)}
                selectedItem={selectedItem}
                getModuleIcon={getModuleIcon}
            />
        </div>
    );
}; 

