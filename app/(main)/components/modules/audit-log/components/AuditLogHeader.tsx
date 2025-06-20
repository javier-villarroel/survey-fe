'use client';

import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { User } from '../types';
import { 
    AuditModule, 
    AuditEvent, 
    ModuleTranslations, 
    EventTranslations 
} from '../constants/enums';

interface AuditLogHeaderProps {
    users: User[];
    selectedUser: User | null;
    selectedModule: AuditModule | null;
    selectedEvent: AuditEvent | null;
    startDate: Date | null;
    endDate: Date | null;
    onUserChange: (user: User | null) => void;
    onModuleChange: (module: AuditModule | null) => void;
    onEventChange: (event: AuditEvent | null) => void;
    onDateRangeChange: (start: Date | null, end: Date | null) => void;
    usersLoading: boolean;
}

const moduleOptions = [
    ...Object.entries(ModuleTranslations).map(([value, label]) => ({
        label,
        value: value as AuditModule
    }))
];

const eventOptions = [
    ...Object.entries(EventTranslations).map(([value, label]) => ({
        label,
        value: value as AuditEvent
    }))
];

export const AuditLogHeader: React.FC<AuditLogHeaderProps> = ({
    users = [],
    selectedUser,
    selectedModule,
    selectedEvent,
    startDate,
    endDate,
    onUserChange,
    onModuleChange,
    onEventChange,
    onDateRangeChange,
    usersLoading
}) => {
    const userOptions = [
        // { label: 'Todos los usuarios', value: null },
        ...(Array.isArray(users) ? users.map(user => ({
            label: `${user.firstName} ${user.lastName} - ${user.email}`,
            value: user
        })) : [])
    ];

    const handleClearFilters = () => {
        onUserChange(null);
        onDateRangeChange(null, null);
        onEventChange(null);
        onModuleChange(null);
    };

    const hasActiveFilters = selectedUser || startDate || endDate || selectedEvent || selectedModule;

    return (
        <div className="flex flex-column gap-4">
            <div className="flex flex-column sm:flex-row justify-content-between align-items-start sm:align-items-center gap-3">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Bitácora de Actividades</h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Registro detallado de todas las acciones realizadas en el sistema
                    </p>
                </div>
            </div>
            <div className="flex justify-content-center">
                <div className="flex flex-column gap-4 w-full" style={{ maxWidth: '1200px' }}>
                    {hasActiveFilters && (
                        <div className="flex justify-content-end">
                            <Button
                                icon="pi pi-filter-slash"
                                label="Limpiar todos los filtros"
                                severity="secondary"
                                outlined
                                className="p-button-sm"
                                onClick={handleClearFilters}
                            />
                        </div>
                    )}
                    
                    <div className="grid">
                        <div className="col-12 md:col-3">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="userFilter" className="font-medium">
                                    Usuario
                                </label>
                                <Dropdown
                                    id="userFilter"
                                    value={selectedUser}
                                    options={userOptions}
                                    onChange={(e) => onUserChange(e.value)}
                                    placeholder="Seleccionar usuario"
                                    className="w-full"
                                    loading={usersLoading}
                                    disabled={usersLoading}
                                    optionLabel="label"
                                    emptyMessage="No hay usuarios disponibles"
                                    filter
                                    filterBy="label"
                                />
                            </div>
                        </div>
                        <div className="col-12 md:col-3">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="eventFilter" className="font-medium">
                                    Acción
                                </label>
                                <Dropdown
                                    id="eventFilter"
                                    value={selectedEvent}
                                    options={eventOptions}
                                    onChange={(e) => onEventChange(e.value)}
                                    placeholder="Seleccionar evento"
                                    className="w-full"
                                    optionLabel="label"
                                />
                            </div>
                        </div>
                        <div className="col-12 md:col-3">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="moduleFilter" className="font-medium">
                                    Módulo
                                </label>
                                <Dropdown
                                    id="moduleFilter"
                                    value={selectedModule}
                                    options={moduleOptions}
                                    onChange={(e) => onModuleChange(e.value)}
                                    placeholder="Seleccionar módulo"
                                    className="w-full"
                                    optionLabel="label"
                                />
                            </div>
                        </div>
                        <div className="col-12 md:col-3">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="dateRange" className="font-medium">
                                    Rango de Fechas
                                </label>
                                <div className="flex gap-2">
                                    <Calendar
                                        id="startDate"
                                        value={startDate}
                                        onChange={(e) => onDateRangeChange(e.value as Date | null, endDate)}
                                        showIcon
                                        placeholder="Fecha inicial"
                                        className="w-full"
                                        maxDate={endDate || undefined}
                                        dateFormat="dd/mm/yy"
                                        locale="es"
                                        style={{ minWidth: '200px' }}
                                    />
                                    <Calendar
                                        id="endDate"
                                        value={endDate}
                                        onChange={(e) => onDateRangeChange(startDate, e.value as Date | null)}
                                        showIcon
                                        placeholder="Fecha final"
                                        className="w-full"
                                        minDate={startDate || undefined}
                                        dateFormat="dd/mm/yy"
                                        locale="es"
                                        style={{ minWidth: '200px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 