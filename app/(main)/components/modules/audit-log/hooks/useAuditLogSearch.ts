import { useState, useCallback, useEffect } from 'react';
import { auditLogService } from '../services/auditLogService';
import { AuditLogItem } from '../types';
import { toast } from 'sonner';

interface UseAuditLogSearchReturn {
    searchTerm: string;
    searchResults: AuditLogItem[];
    loading: boolean;
    error: Error | null;
    setSearchTerm: (term: string) => void;
    clearSearch: () => void;
}

export const useAuditLogSearch = (): UseAuditLogSearchReturn => {
    const [searchTerm, setSearchTermState] = useState<string>('');
    const [searchResults, setSearchResults] = useState<AuditLogItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleSearch = useCallback(async (term: string) => {
        if (!term.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await auditLogService.getAuditLogs(
                { page: 1, limit: 100 },
                { searchTerm: term.trim() }
            );

            setSearchResults(response.result);
        } catch (err) {
            toast.error('Error al realizar la búsqueda');
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            handleSearch(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, handleSearch]);

    const handleSetSearchTerm = useCallback((term: string) => {
        try {
            if (term.length > 100) {
                throw new Error('El término de búsqueda no puede exceder los 100 caracteres');
            }

            setSearchTermState(term);
            setError(null);
        } catch (err) {
            toast.error((err as Error).message);
            setError(err as Error);
        }
    }, []);

    const clearSearch = useCallback(() => {
        setSearchTermState('');
        setSearchResults([]);
        setError(null);
    }, []);

    return {
        searchTerm,
        searchResults,
        loading,
        error,
        setSearchTerm: handleSetSearchTerm,
        clearSearch
    };
}; 