export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'completed';
    logo?: string;
    createdAt: string;
    updatedAt: string;
    startDate?: string; // Fecha de inicio del proyecto
    endDate?: string; // Fecha de fin del proyecto
}

export interface ProjectsListResponse {
    result: Project[];
    pagination: {
        page: number;
        perPage: number;
        count: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        startDate: string;
        endDate: string;
    };
}

export type StimulusType = 'color' | 'audio' | 'video' | 'image' |'text';

export interface Stimulus {
    id: string;
    type: StimulusType;
    name: string;
    value: string; // URL para archivos, código hexadecimal para colores
    size?: number;
    duration?: number;
    createdAt: string;
    description?: string;
    url?: string; // URL del archivo (para audio, texto, etc.)
    format?: string; // Formato del archivo (por ejemplo, mp3, txt, jpg)
    updatedAt?: string; // Fecha de última actualización
}

export interface StimulusImport {
    name: string;
    type: StimulusType;
    value: string;
    filePath?: string; // Ruta local del archivo
}

export const STIMULUS_TEMPLATE_HEADERS = [
    { field: 'name', header: 'Nombre del Estímulo' },
    { field: 'type', header: 'Tipo (color/sound/video/image)' },
    { field: 'value', header: 'Valor (código hex para colores)' },
    { field: 'filePath', header: 'Ruta del Archivo (para sound/video/image)' }
];

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
        type: 'audio',
        name: 'Audio de prueba',
        value: 'https://example.com/audio.mp3',
        size: 3 * 1024 * 1024, // 3MB
        duration: 180, // 3 minutos
        createdAt: new Date().toISOString()
    },
    {
        id: '4',
        type: 'text',
        name: 'Texto de prueba',
        value: 'Este es un texto de ejemplo.',
        createdAt: new Date().toISOString()
    },
    {
        id: '5',
        type: 'color',
        name: 'Color de prueba',
        value: '#FF5733', // Código hexadecimal
        createdAt: new Date().toISOString()
    }
    
]; 