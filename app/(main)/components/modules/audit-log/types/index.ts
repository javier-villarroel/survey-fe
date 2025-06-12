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