'use client';
import { useState, useEffect } from 'react';
import { getAuditLogs, getModules, getActions } from '../services/auditLogService';
import { AuditLogEntry, AuditLogFilters } from '../types';

// Datos mockeados
const mockUsers = [
    { id: '1', name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: '2', name: 'María García', email: 'maria.garcia@example.com' },
    { id: '3', name: 'Carlos López', email: 'carlos.lopez@example.com' }
];

const mockData: AuditLogEntry[] = [
    {
        id: '1',
        action: 'Crear',
        module: 'Encuestas',
        description: 'Creó una nueva encuesta de satisfacción del cliente',
        user: mockUsers[0],
        metadata: {
            'ID de Encuesta': 'ENC-2024-001',
            'Título': 'Satisfacción del Cliente Q1 2024',
            'Tipo': 'Cliente Externo',
            'Preguntas': '15'
        },
        created_at: '2024-03-15T14:30:00Z'
    },
    {
        id: '2',
        action: 'Modificar',
        module: 'Usuarios',
        description: 'Actualizó los permisos del rol Supervisor',
        user: mockUsers[1],
        metadata: {
            'Rol': 'Supervisor',
            'Permisos agregados': ['encuestas.edit', 'reportes.view'],
            'Permisos removidos': ['admin.access']
        },
        created_at: '2024-03-15T13:15:00Z'
    },
    {
        id: '3',
        action: 'Eliminar',
        module: 'Preguntas',
        description: 'Eliminó una pregunta de la encuesta de evaluación de servicio',
        user: mockUsers[0],
        metadata: {
            'Pregunta': '¿Cómo calificaría nuestro servicio?',
            'Tipo': 'Selección múltiple',
            'Encuesta': 'Evaluación de Servicio 2024'
        },
        created_at: '2024-03-15T12:00:00Z'
    },
    {
        id: '4',
        action: 'Crear',
        module: 'Reportes',
        description: 'Generó un nuevo reporte de resultados',
        user: mockUsers[2],
        metadata: {
            'Tipo de Reporte': 'Análisis de Tendencias',
            'Período': 'Enero - Marzo 2024',
            'Formato': 'PDF',
            'Tamaño': '2.5 MB'
        },
        created_at: '2024-03-15T11:45:00Z'
    },
    {
        id: '5',
        action: 'Modificar',
        module: 'Encuestas',
        description: 'Actualizó la configuración de la encuesta de clima laboral',
        user: mockUsers[1],
        metadata: {
            'Encuesta': 'Clima Laboral 2024',
            'Cambios': {
                'Fecha límite': '2024-04-30',
                'Anonimato': true,
                'Notificaciones': 'Semanales'
            }
        },
        created_at: '2024-03-15T10:30:00Z'
    },
    {
        id: '6',
        action: 'Ver',
        module: 'Respuestas',
        description: 'Consultó los resultados de la encuesta de satisfacción',
        user: mockUsers[2],
        metadata: {
            'Encuesta': 'Satisfacción del Cliente Q4 2023',
            'Total Respuestas': '150',
            'Promedio': '4.5/5'
        },
        created_at: '2024-03-15T09:15:00Z'
    }
];

const useAuditLog = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<AuditLogEntry[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState<AuditLogFilters>({});
    const [modules, setModules] = useState<string[]>([]);
    const [actions, setActions] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [users] = useState(mockUsers);

    const fetchModules = async () => {
        try {
            const modulesList = await getModules();
            setModules(modulesList);
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    const fetchActions = async (module?: string) => {
        try {
            const actionsList = await getActions(module);
            setActions(actionsList);
        } catch (error) {
            console.error('Error fetching actions:', error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAuditLogs(page, pageSize, filters);
            setData(response.items);
            setTotal(response.total);
        } catch (error) {
            console.error('Error fetching audit logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    useEffect(() => {
        fetchActions(filters.module);
    }, [filters.module]);

    useEffect(() => {
        fetchData();
    }, [page, pageSize, filters]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 500));

            let filteredData = [...mockData];
            
            // Filtrar por usuario si se ha seleccionado uno
            if (selectedUser && selectedUser.id !== 'all') {
                filteredData = filteredData.filter(item => item.user.id === selectedUser.id);
            }

            // Ordenar por fecha más reciente
            filteredData.sort((a, b) => 
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            setData(filteredData);
            setLoading(false);
        };

        fetchData();
    }, [selectedUser]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilterChange = (newFilters: Partial<AuditLogFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPage(1); // Reset to first page when filters change
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    const handleUserChange = (user: any) => {
        setSelectedUser(user);
    };

    return {
        data,
        total,
        page,
        pageSize,
        loading,
        filters,
        modules,
        actions,
        users,
        selectedUser,
        handleFilterChange,
        handlePageChange,
        handlePageSizeChange,
        handleUserChange
    };
};

export { useAuditLog }; 