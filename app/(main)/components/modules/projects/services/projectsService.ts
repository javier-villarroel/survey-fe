import { Project, ProjectsListResponse } from './types';

// Datos mockeados
const mockProjects: Project[] = [
    {
        id: '1',
        name: 'Sistema de Gestión de Inventario',
        description: 'Desarrollo de un sistema completo para gestión de inventario y stock',
        status: 'active',
        startDate: '2024-01-15',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        name: 'Portal de Clientes',
        description: 'Portal web para autogestión de clientes',
        status: 'active',
        startDate: '2024-02-01',
        createdAt: '2024-02-01T09:00:00Z',
        updatedAt: '2024-02-01T09:00:00Z'
    },
    {
        id: '3',
        name: 'App Móvil de Delivery',
        description: 'Aplicación móvil para servicio de entrega a domicilio',
        status: 'completed',
        startDate: '2023-11-01',
        endDate: '2024-01-30',
        createdAt: '2023-11-01T08:00:00Z',
        updatedAt: '2024-01-30T16:00:00Z'
    },
    {
        id: '4',
        name: 'Sistema de Recursos Humanos',
        description: 'Sistema integral para gestión de RRHH',
        status: 'inactive',
        startDate: '2024-03-01',
        createdAt: '2024-03-01T11:00:00Z',
        updatedAt: '2024-03-01T11:00:00Z'
    },
    {
        id: '5',
        name: 'Plataforma E-learning',
        description: 'Plataforma educativa en línea',
        status: 'active',
        startDate: '2024-02-15',
        createdAt: '2024-02-15T13:00:00Z',
        updatedAt: '2024-02-15T13:00:00Z'
    }
];

export const projectsService = {
    getProjects: async (params: { page: number; limit: number; search?: string }): Promise<ProjectsListResponse> => {
        // Simulamos un delay para simular la llamada a la API
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredProjects = [...mockProjects];

        // Aplicar búsqueda si existe
        if (params.search) {
            const searchLower = params.search.toLowerCase();
            filteredProjects = filteredProjects.filter(project => 
                project.name.toLowerCase().includes(searchLower) ||
                project.description.toLowerCase().includes(searchLower)
            );
        }

        // Calcular paginación
        const startIndex = (params.page - 1) * params.limit;
        const endIndex = startIndex + params.limit;
        const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

        return {
            result: paginatedProjects,
            pagination: {
                page: params.page,
                perPage: params.limit,
                count: filteredProjects.length,
                hasNextPage: endIndex < filteredProjects.length,
                hasPrevPage: params.page > 1
            }
        };
    }
}; 