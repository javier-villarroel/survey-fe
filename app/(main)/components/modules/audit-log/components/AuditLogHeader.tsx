'use client';

import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { User } from '../types';

interface AuditLogHeaderProps {
    users: User[];
    selectedUser: User | null;
    onUserChange: (user: User | null) => void;
}

export const AuditLogHeader: React.FC<AuditLogHeaderProps> = ({
    users,
    selectedUser,
    onUserChange
}) => {
    return (
        <div className="flex justify-content-between align-items-center mb-4 sm:mb-6">
            <div>
                <h2 className="text-xl sm:text-2xl font-bold m-0">Bitácora del Sistema</h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    Historial de actividades y cambios
                </p>
            </div>
            <div className="w-64">
                <Dropdown
                    value={selectedUser}
                    options={[{ id: 'all', name: 'Todos los usuarios', email: '' }, ...users]}
                    onChange={(e) => onUserChange(e.value)}
                    optionLabel="name"
                    placeholder="Seleccionar un usuario"
                    className="w-full"
                />
            </div>
        </div>
    );
}; 