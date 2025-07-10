import { Questionnaire } from '../types';

export const mockQuestionnaires: Questionnaire[] = [
    {
        id: '1',
        title: 'Cuestionario de Satisfacción',
        status: 'active',
        createdAt: '2024-03-20T10:00:00Z',
        updatedAt: '2024-03-20T10:00:00Z',
        totalQuestions: 15
    },
    {
        id: '2',
        title: 'Evaluación de Producto',
        status: 'draft',
        createdAt: '2024-03-19T15:30:00Z',
        updatedAt: '2024-03-19T16:45:00Z',
        totalQuestions: 10
    }
]; 