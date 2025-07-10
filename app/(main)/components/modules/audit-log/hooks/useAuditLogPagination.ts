import { useState, useCallback, useEffect } from 'react';
import { auditLogService } from '../services/auditLogService';
import { AuditLogItem } from '../types';
import { toast } from 'sonner';

interface UseAuditLogPaginationReturn {
    items: AuditLogItem[];
    loading: boolean;
    error: Error | null;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    resetPagination: () => void;
}

export const useAuditLogPagination = (
    initialPage: number = 1,
    initialPageSize: number = 10,
    filters?: Record<string, any>
): UseAuditLogPaginationReturn => {
    const [items, setItems] = useState<AuditLogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPageState] = useState(initialPage);
    const [pageSize, setPageSizeState] = useState(initialPageSize);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await auditLogService.getAuditLogs(
                { page, limit: pageSize },
                filters
            );

            setItems(response.result);
            setTotal(response.pagination.totalDocs);
            setTotalPages(response.pagination.totalPages);
            setHasNextPage(response.pagination.hasNextPage);
            setHasPrevPage(response.pagination.hasPrevPage);
        } catch (err) {
            toast.error('Error al cargar los registros');
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, filters]);

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

            setPageState(newPage);
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

            setPageSizeState(newSize);
            setPageState(1); // Reset to first page when changing page size
            setError(null);
        } catch (err) {
            toast.error((err as Error).message);
            setError(err as Error);
        }
    }, []);

    const resetPagination = useCallback(() => {
        setPageState(initialPage);
        setPageSizeState(initialPageSize);
        setError(null);
    }, [initialPage, initialPageSize]);

    return {
        items,
        loading,
        error,
        page,
        pageSize,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
        setPage: handleSetPage,
        setPageSize: handleSetPageSize,
        resetPagination
    };
}; 