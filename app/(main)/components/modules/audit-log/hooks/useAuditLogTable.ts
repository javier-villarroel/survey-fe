import { useState, useCallback, useEffect } from 'react';
import { auditLogService } from '../services/auditLogService';
import { AuditLogItem } from '../types';
import { AuditModule, AuditEvent } from '../constants/enums';
import { User } from '../types';
import { toast } from 'sonner';

interface UseAuditLogTableReturn {
    items: AuditLogItem[];
    loading: boolean;
    error: Error | null;
    total: number;
    page: number;
    pageSize: number;
    startDate: Date | null;
    endDate: Date | null;
    selectedModule: AuditModule | null;
    selectedEvent: AuditEvent | null;
    selectedUser: User | null;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setDateRange: (start: Date | null, end: Date | null) => void;
    setSelectedModule: (module: AuditModule | null) => void;
    setSelectedEvent: (event: AuditEvent | null) => void;
    setSelectedUser: (user: User | null) => void;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    refresh: () => Promise<void>;
}

export const useAuditLogTable = (): UseAuditLogTableReturn => {
    const [items, setItems] = useState<AuditLogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedModule, setSelectedModule] = useState<AuditModule | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const filters: Record<string, any> = {};

            if (selectedModule) {
                filters.module = selectedModule;
            }
            if (selectedEvent) {
                filters.event = selectedEvent;
            }
            if (selectedUser) {
                filters.user = {
                    email: selectedUser.email
                };
            }
            if (startDate) {
                const startOfDay = new Date(startDate);
                startOfDay.setHours(0, 0, 0, 0);
                filters.startDate = startOfDay.toISOString();
            }
            if (endDate) {
                const endOfDay = new Date(endDate);
                endOfDay.setHours(23, 59, 59, 999);
                filters.endDate = endOfDay.toISOString();
            }

            const response = await auditLogService.getAuditLogs(
                { page, limit: pageSize },
                Object.keys(filters).length > 0 ? filters : undefined
            );

            setItems(response.result);
            setTotal(response.pagination.totalDocs);
            setTotalPages(response.pagination.totalPages);
            setHasNextPage(response.pagination.hasNextPage);
            setHasPrevPage(response.pagination.hasPrevPage);
        } catch (err) {
            toast.error('Error al cargar los registros de auditoría');
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, selectedModule, selectedEvent, selectedUser, startDate, endDate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSetPage = useCallback((newPage: number) => {
        try {
            if (newPage < 1) {
                throw new Error('El número de página no puede ser menor a 1');
            }
            if (newPage > totalPages) {
                throw new Error(`El número de página no puede ser mayor a ${totalPages}`);
            }

            setPage(newPage);
            setError(null);
        } catch (err) {
            toast.error((err as Error).message);
            setError(err as Error);
        }
    }, [totalPages]);

    const handleSetPageSize = useCallback((newSize: number) => {
        try {
            if (newSize < 1) {
                throw new Error('El tamaño de página no puede ser menor a 1');
            }
            if (newSize > 100) {
                throw new Error('El tamaño de página no puede ser mayor a 100');
            }

            setPageSize(newSize);
            setPage(1); // Reset to first page when changing page size
            setError(null);
        } catch (err) {
            toast.error((err as Error).message);
            setError(err as Error);
        }
    }, []);

    const handleSetDateRange = useCallback((start: Date | null, end: Date | null) => {
        try {
            if (start && end && start > end) {
                throw new Error('La fecha inicial no puede ser mayor que la fecha final');
            }

            setStartDate(start);
            setEndDate(end);
            setPage(1); // Reset to first page when changing filters
            setError(null);
        } catch (err) {
            toast.error((err as Error).message);
            setError(err as Error);
        }
    }, []);

    const handleSetSelectedModule = useCallback((module: AuditModule | null) => {
        setSelectedModule(module);
        if (!module) {
            setSelectedEvent(null); // Clear event when module is cleared
        }
        setPage(1); // Reset to first page when changing filters
        setError(null);
    }, []);

    const handleSetSelectedEvent = useCallback((event: AuditEvent | null) => {
        try {
            if (event && !selectedModule) {
                throw new Error('Debe seleccionar un módulo primero');
            }
            setSelectedEvent(event);
            setPage(1); // Reset to first page when changing filters
            setError(null);
        } catch (err) {
            toast.error((err as Error).message);
            setError(err as Error);
        }
    }, [selectedModule]);

    const handleSetSelectedUser = useCallback((user: User | null) => {
        setSelectedUser(user);
        setPage(1); // Reset to first page when changing filters
        setError(null);
    }, []);

    return {
        items,
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
        setPage: handleSetPage,
        setPageSize: handleSetPageSize,
        setDateRange: handleSetDateRange,
        setSelectedModule: handleSetSelectedModule,
        setSelectedEvent: handleSetSelectedEvent,
        setSelectedUser: handleSetSelectedUser,
        totalPages,
        hasNextPage,
        hasPrevPage,
        refresh: fetchData
    };
}; 