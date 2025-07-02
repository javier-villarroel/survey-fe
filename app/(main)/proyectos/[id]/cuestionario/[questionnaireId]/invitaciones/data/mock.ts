import { Participant } from '../types';

export const mockParticipants: Participant[] = [
    {
        id: '1',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        status: 'completed',
        invitationDate: '2024-03-15T10:00:00Z',
        completionDate: '2024-03-16T15:30:00Z'
    },
    {
        id: '2',
        firstName: 'María',
        lastName: 'García',
        email: 'maria.garcia@example.com',
        status: 'sent',
        invitationDate: '2024-03-15T10:00:00Z'
    },
    {
        id: '3',
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        email: 'carlos.rodriguez@example.com',
        status: 'pending',
        invitationDate: '2024-03-15T10:00:00Z'
    }
]; 