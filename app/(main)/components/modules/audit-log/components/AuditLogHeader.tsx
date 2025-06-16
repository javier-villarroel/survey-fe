import React from 'react';
import { Dropdown } from 'primereact/dropdown';

interface AuditLogHeaderProps {
    selectedUser: any;
    users: any[];
    onUserChange: (user: any) => void;
}

export const AuditLogHeader: React.FC<AuditLogHeaderProps> = ({
    selectedUser,
    users,
    onUserChange
}) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
            <div>
                <h2 className="text-xl sm:text-2xl font-bold m-0">Bitácora del Sistema</h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    Historial de actividades y cambios
                </p>
            </div>
            <div className="w-full sm:w-80">
                <Dropdown
                    value={selectedUser}
                    options={[{ id: 'all', name: 'Todos los usuarios' }, ...users]}
                    onChange={(e) => onUserChange(e.value)}
                    optionLabel="name"
                    placeholder="Seleccionar un usuario"
                    className="w-full"
                />
            </div>
        </div>
    );
}; 