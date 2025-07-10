import { useState, useCallback } from 'react';
import { AuditModule, AuditEvent } from '../constants/enums';
import { User } from '../types';
import { toast } from 'sonner';

interface UseAuditLogFiltersReturn {
    selectedModule: AuditModule | null;
    selectedEvent: AuditEvent | null;
    selectedUser: User | null;
    error: Error | null;
    setSelectedModule: (module: AuditModule | null) => void;
    setSelectedEvent: (event: AuditEvent | null) => void;
    setSelectedUser: (user: User | null) => void;
    clearFilters: () => void;
}

export const useAuditLogFilters = (): UseAuditLogFiltersReturn => {
    const [selectedModule, setSelectedModuleState] = useState<AuditModule | null>(null);
    const [selectedEvent, setSelectedEventState] = useState<AuditEvent | null>(null);
    const [selectedUser, setSelectedUserState] = useState<User | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const handleSetSelectedModule = useCallback((module: AuditModule | null) => {
        try {
            setSelectedModuleState(module);
            if (!module) {
                setSelectedEventState(null); // Clear event when module is cleared
            }
            setError(null);
        } catch (err) {
            toast.error('Error al establecer el módulo');
            setError(err as Error);
        }
    }, []);

    const handleSetSelectedEvent = useCallback((event: AuditEvent | null) => {
        try {
            if (event && !selectedModule) {
                throw new Error('Debe seleccionar un módulo primero');
            }
            setSelectedEventState(event);
            setError(null);
        } catch (err) {
            toast.error((err as Error).message);
            setError(err as Error);
        }
    }, [selectedModule]);

    const handleSetSelectedUser = useCallback((user: User | null) => {
        try {
            setSelectedUserState(user);
            setError(null);
        } catch (err) {
            toast.error('Error al establecer el usuario');
            setError(err as Error);
        }
    }, []);

    const clearFilters = useCallback(() => {
        setSelectedModuleState(null);
        setSelectedEventState(null);
        setSelectedUserState(null);
        setError(null);
    }, []);

    return {
        selectedModule,
        selectedEvent,
        selectedUser,
        error,
        setSelectedModule: handleSetSelectedModule,
        setSelectedEvent: handleSetSelectedEvent,
        setSelectedUser: handleSetSelectedUser,
        clearFilters
    };
}; 