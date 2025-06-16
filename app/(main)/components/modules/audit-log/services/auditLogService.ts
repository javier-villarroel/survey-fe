'use client';

import axios from 'axios';
import { AuditLogFilters, AuditLogResponse, AuditLogItem, User } from '../types';
import { mockUsers, mockAuditLogs } from '../data/mockData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface AuditLogParams {
    userId?: string;
    page?: number;
    pageSize?: number;
    startDate?: string;
    endDate?: string;
    module?: string;
    action?: string;
}

export const auditLogService = {
    async getAuditLogs(params: AuditLogParams): Promise<{ data: AuditLogItem[]; total: number }> {
        try {
            // TODO: Reemplazar con la llamada real a la API cuando esté lista
            // const response = await axios.get(`${API_URL}/bitacora`, { params });
            // return response.data;

            // Simulación de llamada a API con datos mock
            const { userId, module, action, startDate, endDate, page = 1, pageSize = 10 } = params;
            
            let filteredData = [...mockAuditLogs];

            if (userId && userId !== 'all') {
                filteredData = filteredData.filter(item => item.user.id === userId);
            }

            if (module) {
                filteredData = filteredData.filter(item => item.module.toLowerCase() === module.toLowerCase());
            }

            if (action) {
                filteredData = filteredData.filter(item => item.action.toLowerCase() === action.toLowerCase());
            }

            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0); // Inicio del día
                filteredData = filteredData.filter(item => new Date(item.created_at) >= start);
            }

            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999); // Fin del día
                filteredData = filteredData.filter(item => new Date(item.created_at) <= end);
            }

            const total = filteredData.length;
            const start = (page - 1) * pageSize;
            const paginatedData = filteredData.slice(start, start + pageSize);

            return {
                data: paginatedData,
                total
            };
        } catch (error) {
            console.error('Error fetching audit logs:', error);
            throw error;
        }
    },

    async getUsers(): Promise<User[]> {
        try {
            // TODO: Reemplazar con la llamada real a la API cuando esté lista
            // const response = await axios.get(`${API_URL}/users`);
            // return response.data;

            return mockUsers;
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
            startDate: filters?.startDate?.toISOString(),
            endDate: filters?.endDate?.toISOString(),
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