import { useState, useCallback } from 'react';
import { auditLogService } from '../services/auditLogService';
import { AuditModule, AuditEvent } from '../constants/enums';
import { User } from '../types';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import { toast } from 'sonner';

interface UseAuditLogExportReturn {
    exporting: boolean;
    error: Error | null;
    exportToExcel: (filters?: {
        startDate?: Date;
        endDate?: Date;
        selectedModule?: AuditModule;
        selectedEvent?: AuditEvent;
        selectedUser?: User;
    }) => Promise<void>;
}

export const useAuditLogExport = (): UseAuditLogExportReturn => {
    const [exporting, setExporting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const exportToExcel = useCallback(async (filters?: {
        startDate?: Date;
        endDate?: Date;
        selectedModule?: AuditModule;
        selectedEvent?: AuditEvent;
        selectedUser?: User;
    }) => {
        try {
            setExporting(true);
            setError(null);

            const apiFilters: Record<string, any> = {};

            if (filters) {
                if (filters.selectedModule) {
                    apiFilters.module = filters.selectedModule;
                }
                if (filters.selectedEvent) {
                    apiFilters.event = filters.selectedEvent;
                }
                if (filters.selectedUser) {
                    apiFilters.user = {
                        email: filters.selectedUser.email
                    };
                }
                if (filters.startDate) {
                    const startOfDay = new Date(filters.startDate);
                    startOfDay.setHours(0, 0, 0, 0);
                    apiFilters.startDate = startOfDay.toISOString();
                }
                if (filters.endDate) {
                    const endOfDay = new Date(filters.endDate);
                    endOfDay.setHours(23, 59, 59, 999);
                    apiFilters.endDate = endOfDay.toISOString();
                }
            }

            const response = await auditLogService.getAuditLogs(
                { page: 1, limit: 1000 }, // Obtener todos los registros
                apiFilters
            );

            // Formatear los datos para Excel
            const data = response.result.map(log => ({
                'Fecha': new Date(log.createdAt).toLocaleString(),
                'Módulo': log.module,
                'Evento': log.event,
                'Usuario': log.user.email,
                'Descripción': log.description || '-'
            }));

            // Crear y descargar el archivo Excel
            const worksheet = XLSXUtils.json_to_sheet(data);
            const workbook = XLSXUtils.book_new();
            XLSXUtils.book_append_sheet(workbook, worksheet, 'Registros');
            writeFile(workbook, 'registros-auditoria.xlsx');

            toast.success('Archivo Excel generado exitosamente');
        } catch (err) {
            toast.error('Error al exportar los registros');
            setError(err as Error);
        } finally {
            setExporting(false);
        }
    }, []);

    return {
        exporting,
        error,
        exportToExcel
    };
}; 