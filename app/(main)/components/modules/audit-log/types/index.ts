export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuditLogMetadata {
    Antes: Record<string, any>;
    Despues: Record<string, any>;
}

export interface AuditLogItem {
    id: string;
    user: User;
    created_at: string;
    module: string;
    action: string;
    description: string;
    metadata: AuditLogMetadata;
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
    module?: string;
    action?: string;
    startDate?: Date;
    endDate?: Date;
    userId?: string;
}

export interface AuditLogResponse {
    items: AuditLogEntry[];
    total: number;
    page: number;
    pageSize: number;
} 