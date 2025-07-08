import { AuditModule, AuditEvent } from '../constants/enums';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    twoFactorAuth: boolean;
    email: string;
    status: string;
}

export interface AuditLogMetadata {
    Antes: Record<string, any>;
    Despues: Record<string, any>;
}

export interface AuditUser {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
}

export interface AuditLogItem {
    id: number;
    user: AuditUser;
    createdAt: string;
    module: AuditModule;
    event: AuditEvent;
    resourceId: number;
    description: string;
    oldData: Record<string, any>;
    newData: Record<string, any>;
    level: 'INFORMATIVE' | 'WARNING' | 'ERROR';
    status: 'SUCCESS' | 'FAILED';
    meta: Record<string, any>;
}

export interface AuditLogState {
    selectedUser: User | null;
    visible: boolean;
    selectedItem: AuditLogItem | null;
    first: number;
    rows: number;
}

export interface AuditLogEntry {
    id: string;
    action: string;
    module: string;
    description: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    metadata: Record<string, any>;
    created_at: string;
}

export interface AuditLogFilters {
    module?: AuditModule;
    event?: AuditEvent;
    userId?: string;
    startDate?: string;
    endDate?: string;
}

export interface AuditLogPagination {
    totalDocs: number;
    totalPages: number;
    count: number;
    page: number;
    skip: number;
    hasPrevPage: boolean;
    prevPage: boolean | number;
    nextPage: boolean | number;
    hasNextPage: boolean;
    limit: number;
    offset: number;
    perPage: number;
    pagingCounter: number;
}

export interface ApiInfo {
    status: number;
    message: string;
    code: string;
    message_to_show: string;
}

export interface ApiResponse<T> {
    info: ApiInfo;
    result: T[];
    pagination: AuditLogPagination;
}

export type AuditLogResponse = ApiResponse<AuditLogItem>;
export type UserResponse = ApiResponse<User>;

export interface AuditLogParams {
    pagination: {
        page: number;
        limit: number;
    };
    filters?: {
        module?: AuditModule;
        event?: AuditEvent;
        startDate?: string;
        endDate?: string;
    };
} 