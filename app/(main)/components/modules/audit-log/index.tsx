'use client';
import React, { useState, useMemo } from 'react';
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import { AuditLogHeader } from './components/AuditLogHeader';
import { AuditLogTimeline } from './components/AuditLogTimeline';
import { AuditLogDialog } from './components/AuditLogDialog';
import { mockUsers, mockAuditLogs } from './data/mockData';
import { User, AuditLogItem } from './types';
import './styles.css';

export const AuditLog: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>({ id: 'all', name: 'Todos los usuarios', email: '' });
    const [users] = useState<User[]>(mockUsers);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<AuditLogItem | null>(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [data] = useState<AuditLogItem[]>(mockAuditLogs);

    const filteredData = useMemo(() => {
        if (selectedUser?.id === 'all') {
            return data;
        }
        return data.filter(item => item.user.id === selectedUser?.id);
    }, [data, selectedUser]);

    const paginatedData = useMemo(() => {
        return filteredData.slice(first, first + rows);
    }, [filteredData, first, rows]);

    const onPageChange = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);
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

    const handleUserChange = (user: User | null) => {
        setSelectedUser(user);
    };

    const handleItemClick = (item: AuditLogItem) => {
        setSelectedItem(item);
        setVisible(true);
    };

    return (
        <div className="p-2 sm:p-4">
            <Card>
                <AuditLogHeader
                    users={users}
                    selectedUser={selectedUser}
                    onUserChange={handleUserChange}
                />
                <div className="flex flex-col gap-4">
                    <AuditLogTimeline
                        items={paginatedData}
                        onItemClick={handleItemClick}
                        getActionIcon={getActionIcon}
                        getModuleIcon={getModuleIcon}
                    />
                </div>
                <div className="flex justify-content-center mt-6 border-t pt-4">
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={filteredData.length}
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

