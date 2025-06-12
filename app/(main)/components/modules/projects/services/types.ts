export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'completed';
    startDate: string;
    endDate?: string;
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

export interface Stimulus {
    id: string;
    name: string;
    description: string;
    type: 'image' | 'video' | 'audio' | 'text';
    url: string;
    duration?: number; // en segundos
    size?: number; // en bytes
    format?: string;
    createdAt: string;
    updatedAt: string;
}

// Mock data for stimuli
export const mockStimuli: Stimulus[] = [
    {
        id: '1',
        name: 'Imagen de producto A',
        description: 'Fotografía del producto en alta resolución',
        type: 'image',
        url: 'https://example.com/images/product-a.jpg',
        format: 'jpg',
        size: 2048576, // 2MB
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
    },
    {
        id: '2',
        name: 'Video promocional',
        description: 'Video explicativo del servicio',
        type: 'video',
        url: 'https://example.com/videos/promo.mp4',
        duration: 120,
        format: 'mp4',
        size: 15728640, // 15MB
        createdAt: '2024-03-14T15:30:00Z',
        updatedAt: '2024-03-14T15:30:00Z'
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