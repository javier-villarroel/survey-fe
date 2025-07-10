import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { UserStatus, UserRoles } from '../lib/enums';
import { InputText } from 'primereact/inputtext';

const roleOptions = [
    { label: 'Todos', value: '' },
    { label: 'Administrador', value: UserRoles.ADMIN },
    { label: 'Sin rol', value: 'NO_ROLE' }
];

const statusOptions = [
    { label: 'Todos', value: '' },
    { label: 'Activo', value: UserStatus.ACTIVE },
    { label: 'Suspendido', value: UserStatus.SUSPENDED },
    { label: 'Bloqueado', value: UserStatus.BLOQUED }
];

interface UserFiltersProps {
    filters: {
        firstName?: string;
        lastName?: string;
        email?: string;
        'role.name'?: string;
        status?: string;
    };
    onFilterChange: (field: string, value: any) => void;
    onClearFilters: () => void;
}

export const UserFilters = ({ filters = {}, onFilterChange, onClearFilters }: UserFiltersProps) => {
    return (
        <div className="grid p-fluid mb-4">
            <div className="col-12 md:col-2">
                <span className="p-float-label">
                    <InputText
                        id="firstName"
                        value={filters.firstName || ''}
                        onChange={(e) => onFilterChange('firstName', e.target.value)}
                    />
                    <label htmlFor="firstName">Nombre</label>
                </span>
            </div>
            <div className="col-12 md:col-2">
                <span className="p-float-label">
                    <InputText
                        id="lastName"
                        value={filters.lastName || ''}
                        onChange={(e) => onFilterChange('lastName', e.target.value)}
                    />
                    <label htmlFor="lastName">Apellido</label>
                </span>
            </div>
            <div className="col-12 md:col-3">
                <span className="p-float-label">
                    <InputText
                        id="email"
                        value={filters.email || ''}
                        onChange={(e) => onFilterChange('email', e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </span>
            </div>
            <div className="col-12 md:col-2">
                <span className="p-float-label">
                    <Dropdown
                        id="role"
                        value={filters['role.name'] || ''}
                        options={roleOptions}
                        onChange={(e) => onFilterChange('role.name', e.value)}
                    />
                    <label htmlFor="role">Rol</label>
                </span>
            </div>
            <div className="col-12 md:col-2">
                <span className="p-float-label">
                    <Dropdown
                        id="status"
                        value={filters.status || ''}
                        options={statusOptions}
                        onChange={(e) => onFilterChange('status', e.value)}
                    />
                    <label htmlFor="status">Estado</label>
                </span>
            </div>
            <div className="col-12 md:col-1 flex align-items-end">
                <Button
                    icon="pi pi-filter-slash"
                    onClick={onClearFilters}
                    className="p-button-outlined p-button-secondary w-full"
                    tooltip="Limpiar filtros"
                    tooltipOptions={{ position: 'top' }}
                />
            </div>
        </div>
    );
}; 