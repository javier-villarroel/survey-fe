import { IStimulus, ProjectStatus } from '../types/project.types';

export const projectStatuses = [
    { label: 'Activo', value: 'active' as ProjectStatus },
    { label: 'Inactivo', value: 'inactive' as ProjectStatus },
    { label: 'Completado', value: 'completed' as ProjectStatus }
];

export const stimulusTypes = [
    { label: 'Color', value: 'color' },
    { label: 'Sonido', value: 'sound' },
    { label: 'Video', value: 'video' },
    { label: 'Imagen', value: 'image' }
];

export const mockStimuli: IStimulus[] = [
    {
        id: '1',
        name: 'Color Rojo',
        type: 'color',
        value: '#FF0000',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Sonido de Campana',
        type: 'sound',
        value: 'bell.mp3',
        size: 1024 * 1024, // 1MB
        duration: 3,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Video de Introducción',
        type: 'video',
        value: 'intro.mp4',
        size: 5 * 1024 * 1024, // 5MB
        duration: 30,
        createdAt: new Date().toISOString()
    },
    {
        id: '4',
        name: 'Imagen de Test',
        type: 'image',
        value: 'test.jpg',
        size: 2 * 1024 * 1024, // 2MB
        createdAt: new Date().toISOString()
    }
]; 