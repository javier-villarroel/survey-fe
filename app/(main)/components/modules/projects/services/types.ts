export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'completed';
    logo?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectsListResponse {
    result: Project[];
    pagination: {
        page: number;
        perPage: number;
        count: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export type StimulusType = 'color' | 'sound' | 'video' | 'image';

export interface Stimulus {
    id: string;
    type: StimulusType;
    name: string;
    value: string; // URL para archivos, código hexadecimal para colores
    size?: number;
    duration?: number;
    createdAt: string;
}

// Mock data for stimuli
export const mockStimuli: Stimulus[] = [
    {
        id: '1',
        type: 'image',
        name: 'Imagen de prueba',
        value: 'https://example.com/image.jpg',
        size: 1024 * 1024, // 1MB
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        type: 'video',
        name: 'Video de prueba',
        value: 'https://example.com/video.mp4',
        size: 5 * 1024 * 1024, // 5MB
        duration: 120, // 2 minutos
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Mensaje de bienvenida',
        description: 'Audio de introducción',
        type: 'audio',
        url: 'https://example.com/audio/welcome.mp3',
        duration: 45,
        format: 'mp3',
        size: 1048576, // 1MB
        createdAt: '2024-03-13T09:15:00Z',
        updatedAt: '2024-03-13T09:15:00Z'
    },
    {
        id: '4',
        name: 'Descripción del producto',
        description: 'Texto detallado sobre características',
        type: 'text',
        url: 'https://example.com/texts/description.txt',
        format: 'txt',
        size: 2048, // 2KB
        createdAt: '2024-03-12T14:20:00Z',
        updatedAt: '2024-03-12T14:20:00Z'
    },
    {
        id: '5',
        name: 'Imagen de empaque',
        description: 'Fotografía del empaque del producto',
        type: 'image',
        url: 'https://example.com/images/packaging.jpg',
        format: 'jpg',
        size: 3145728, // 3MB
        createdAt: '2024-03-11T11:45:00Z',
        updatedAt: '2024-03-11T11:45:00Z'
    }
]; 