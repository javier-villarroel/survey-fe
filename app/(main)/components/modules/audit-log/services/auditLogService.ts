'use client';

import axios from 'axios';
import { AuditLogResponse, UserResponse, AuditLogFilters } from '../types';
import apiWithAuth from '@/app/api/axios';
// import { AuditLogParams } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface AuditLogParams {
    userId?: string;
    page?: number;
    pageSize?: number;
    startDate?: string;
    endDate?: string;
    module?: string;
    action?: string;
    pagination?: string;
    queries?: string;
}

interface PaginationParams {
    page: number;
    limit: number;
}

interface Pagination {
    page: number;
    limit: number;
}

interface QueryFilter {
    field: string;
    text: string;
}

export const auditLogService = {
    getAuditLogs: async (pagination: Pagination, filters?: Record<string, any>) => {
        try {
            // Construir los queries basados en los filtros
            const queries: QueryFilter[] = [];
            let dateFilters: Record<string, any> | undefined;
            
            if (filters) {
                if (filters.module) {
                    queries.push({ field: 'module', text: filters.module });
                }
                if (filters.event) {
                    queries.push({ field: 'event', text: filters.event });
                }
                if (filters.user?.email) {
                    queries.push({ field: 'user-email', text: filters.user.email });
                }
                if (filters.startDate && filters.endDate) {
                    dateFilters = {
                        createdAt: {
                            gte: filters.startDate,
                            lte: filters.endDate
                        }
                    };
                }
            }

            // Construir los parámetros de la URL
            const params = {
                pagination: JSON.stringify(pagination),
                ...(queries.length > 0 && { queries: JSON.stringify(queries) }),
                ...(dateFilters && { filters: JSON.stringify(dateFilters) }),
                ordering: JSON.stringify({ createdAt: "desc" })
            };

            // Convertir los parámetros a string de consulta
            const queryString = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                queryString.append(key, value);
            });

            const response = await apiWithAuth.get<AuditLogResponse>(`/audit/table?${queryString}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching audit logs:', error);
            throw error;
        }
    },

    getUsers: async () => {
        try {
            const response = await apiWithAuth.get<UserResponse>('/user/table');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
};

export const getAuditLogs = async (
    page: number = 1,
    pageSize: number = 10,
    filters?: AuditLogFilters
): Promise<AuditLogResponse> => {
    const response = await axios.get(`${API_URL}/audit-logs`, {
        params: {
            page,
            pageSize,
            ...filters,
            startDate: filters?.startDate?.toString(),
            endDate: filters?.endDate?.toString(),
        },
    });
    return response.data;
};

export const getModules = async (): Promise<string[]> => {
    const response = await axios.get(`${API_URL}/audit-logs/modules`);
    return response.data;
};

export const getActions = async (module?: string): Promise<string[]> => {
    const response = await axios.get(`${API_URL}/audit-logs/actions`, {
        params: { module }
    });
    return response.data;
}; 