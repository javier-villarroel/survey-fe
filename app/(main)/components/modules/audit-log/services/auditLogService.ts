import axios from 'axios';
import { AuditLogFilters, AuditLogResponse } from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAuditLogs = async (
    page: number = 1,
    pageSize: number = 10,
    filters?: AuditLogFilters
): Promise<AuditLogResponse> => {
    const response = await axios.get(`${BASE_URL}/audit-logs`, {
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
    const response = await axios.get(`${BASE_URL}/audit-logs/modules`);
    return response.data;
};

export const getActions = async (module?: string): Promise<string[]> => {
    const response = await axios.get(`${BASE_URL}/audit-logs/actions`, {
        params: { module }
    });
    return response.data;
}; 