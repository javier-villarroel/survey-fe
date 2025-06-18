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
}

export const useAuditLog = (): UseAuditLogReturn => {
    const [items, setItems] = useState<AuditLogItem[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedModule, setSelectedModule] = useState<AuditModule | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        try {
            setUsersLoading(true);
            const response = await auditLogService.getUsers({
                page: 1,
                limit: 100
            });
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

            const filters = {
                ...(selectedModule && { module: selectedModule }),
                ...(selectedEvent && { event: selectedEvent }),
                ...(selectedUser && { userId: selectedUser.id.toString() }),
                ...(startDate && { startDate: startDate.toISOString() }),
                ...(endDate && { endDate: endDate.toISOString() })
            };

            const response = await auditLogService.getAuditLogs(
                { page, limit: pageSize },
                Object.keys(filters).length > 0 ? filters : undefined
            );

            setItems(response.result);
            setTotal(response.pagination.totalDocs);
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
        usersLoading
    };
}; 