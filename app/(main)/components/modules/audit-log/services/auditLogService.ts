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
    filters?: string;
}

interface PaginationParams {
    page: number;
    limit: number;
}

export const auditLogService = {
    async getAuditLogs(pagination: PaginationParams, filters?: AuditLogFilters): Promise<AuditLogResponse> {
        try {
            const response = await apiWithAuth.get<AuditLogResponse>('/audit/table', {
                params: {
                    pagination: JSON.stringify(pagination),
                    ...(filters && { filters: JSON.stringify(filters) })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching audit logs:', error);
            throw error;
        }
    },

    async getUsers(pagination: PaginationParams): Promise<UserResponse> {
        try {
            const response = await apiWithAuth.get<UserResponse>('/user/table', {
                params: {
                    pagination: JSON.stringify(pagination)
                }
            });
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