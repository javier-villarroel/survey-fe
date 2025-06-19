'use client';
import { useState, useEffect, useCallback } from 'react';
import { auditLogService } from '../services/auditLogService';
import { AuditLogItem, User } from '../types';
import { AuditModule, AuditEvent } from '../constants/enums';

interface UseAuditLogReturn {
    items: AuditLogItem[];
    users: User[];
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
    usersLoading: boolean;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export const useAuditLog = (): UseAuditLogReturn => {
    const [items, setItems] = useState<AuditLogItem[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedModule, setSelectedModule] = useState<AuditModule | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    const fetchUsers = async () => {
        try {
            setUsersLoading(true);
            const response = await auditLogService.getUsers();
            setUsers(response.result);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err as Error);
        } finally {
            setUsersLoading(false);
        }
    };

    const fetchAuditLogs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const filters: Record<string, string> = {};

            if (selectedModule) {
                filters.module = selectedModule;
            }
            if (selectedEvent) {
                filters.event = selectedEvent;
            }
            if (selectedUser) {
                filters.userId = selectedUser.id.toString();
            }
            if (startDate) {
                filters.startDate = startDate.toISOString();
            }
            if (endDate) {
                filters.endDate = endDate.toISOString();
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
            console.error('Error fetching audit logs:', err);
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, selectedModule, selectedEvent, selectedUser, startDate, endDate]);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchAuditLogs();
    }, [fetchAuditLogs]);

    const setDateRange = (start: Date | null, end: Date | null) => {
        setStartDate(start);
        setEndDate(end);
    };

    return {
        items,
        users,
        selectedEvent,
        selectedModule,
        selectedUser,
        loading,
        error,
        total,
        page,
        pageSize,
        startDate,
        endDate,
        setSelectedEvent,
        setSelectedModule,
        setSelectedUser,
        setPage,
        setPageSize,
        setDateRange,
        usersLoading,
        totalPages,
        hasNextPage,
        hasPrevPage
    };
}; 