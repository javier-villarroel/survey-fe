'use client';
import React, { useState, useMemo } from 'react';
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import { mockAuditLogs, mockUsers } from './data/mockData';
import { AuditLogHeader } from './components/AuditLogHeader';
import { AuditLogTimeline } from './components/AuditLogTimeline';
import { AuditLogDialog } from './components/AuditLogDialog';
import './styles.css';

export const AuditLog: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<any>({ id: 'all', name: 'Todos los usuarios' });
    const [users] = useState(mockUsers);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [data] = useState(mockAuditLogs);

    const filteredData = useMemo(() => {
        if (selectedUser.id === 'all') {
            return data;
        }
        return data.filter(item => item.user.id === selectedUser.id);
    }, [data, selectedUser]);

    const paginatedData = useMemo(() => {
        return filteredData.slice(first, first + rows);
    }, [filteredData, first, rows]);

    const handleUserChange = (user: any) => {
        setSelectedUser(user);
    };

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setVisible(true);
    };

    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className="p-2 sm:p-4">
            <Card>
                <AuditLogHeader
                    selectedUser={selectedUser}
                    users={users}
                    onUserChange={handleUserChange}
                />
                <div className="flex flex-col gap-4">
                    <AuditLogTimeline
                        items={paginatedData}
                        onItemClick={handleItemClick}
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
            />
        </div>
    );
}; 

