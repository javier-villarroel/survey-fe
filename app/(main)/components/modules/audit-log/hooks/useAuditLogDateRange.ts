import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface UseAuditLogDateRangeReturn {
    startDate: Date | null;
    endDate: Date | null;
    error: Error | null;
    setDateRange: (start: Date | null, end: Date | null) => void;
    clearDateRange: () => void;
}

export const useAuditLogDateRange = (): UseAuditLogDateRangeReturn => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Al montar el componente, establecer el rango por defecto (último mes)
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 1);
        setDateRange(start, end);
    }, []);

    const setDateRange = useCallback((start: Date | null, end: Date | null) => {
        try {
            if (start && end && start > end) {
                throw new Error('La fecha inicial no puede ser mayor que la fecha final');
            }

            setStartDate(start);
            setEndDate(end);
            setError(null);
        } catch (err) {
            toast.error((err as Error).message);
            setError(err as Error);
        }
    }, []);

    const clearDateRange = useCallback(() => {
        setStartDate(null);
        setEndDate(null);
        setError(null);
    }, []);

    return {
        startDate,
        endDate,
        error,
        setDateRange,
        clearDateRange
    };
}; 