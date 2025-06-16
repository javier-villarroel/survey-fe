'use client';

import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { User } from '../types';

interface AuditLogHeaderProps {
    users: User[];
    selectedUser: User | null;
    onUserChange: (user: User | null) => void;
    startDate: Date | null;
    endDate: Date | null;
    onDateChange: (start: Date | null, end: Date | null) => void;
}

export const AuditLogHeader: React.FC<AuditLogHeaderProps> = ({
    users,
    selectedUser,
    onUserChange,
    startDate,
    endDate,
    onDateChange
}) => {
    const handleStartDateChange = (date: Date | null) => {
        onDateChange(date, endDate);
    };

    const handleEndDateChange = (date: Date | null) => {
        onDateChange(startDate, date);
    };

    const handleClearFilters = () => {
        onUserChange({ id: 'all', name: 'Todos los usuarios', email: '' });
        onDateChange(null, null);
    };

    const hasActiveFilters = selectedUser?.id !== 'all' || startDate || endDate;

    return (
        <div className="flex flex-column gap-4">
            <div className="flex flex-column sm:flex-row justify-content-between align-items-start sm:align-items-center gap-3">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Bitácora de Actividades</h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Registro detallado de todas las acciones realizadas en el sistema
                    </p>
                </div>
                {hasActiveFilters && (
                    <Button
                        icon="pi pi-filter-slash"
                        label="Limpiar filtros"
                        className="p-button-outlined p-button-secondary w-full sm:w-auto"
                        onClick={handleClearFilters}
                    />
                )}
            </div>
            <div className="flex justify-content-center">
                <div className="flex flex-column sm:flex-row gap-4 align-items-stretch sm:align-items-end w-full sm:w-auto" style={{ maxWidth: '800px' }}>
                    <div className="flex flex-column gap-2 w-full sm:w-6">
                        <label htmlFor="userFilter" className="font-medium">
                            Usuario
                        </label>
                        <Dropdown
                            id="userFilter"
                            value={selectedUser}
                            options={users}
                            onChange={(e) => onUserChange(e.value)}
                            optionLabel="name"
                            placeholder="Seleccionar usuario"
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-column gap-2 w-full sm:w-8">
                        <label htmlFor="dateRange" className="font-medium">
                            Rango de Fechas
                        </label>
                        <div className="flex flex-column sm:flex-row gap-2 align-items-stretch sm:align-items-center">
                            <Calendar
                                id="startDate"
                                value={startDate}
                                onChange={(e) => handleStartDateChange(e.value as Date | null)}
                                showIcon
                                dateFormat="dd/mm/yy"
                                placeholder="Fecha inicio"
                                className="w-full"
                                maxDate={endDate || undefined}
                            />
                            <span className="text-gray-500 text-center">hasta</span>
                            <Calendar
                                id="endDate"
                                value={endDate}
                                onChange={(e) => handleEndDateChange(e.value as Date | null)}
                                showIcon
                                dateFormat="dd/mm/yy"
                                placeholder="Fecha fin"
                                className="w-full"
                                minDate={startDate || undefined}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 