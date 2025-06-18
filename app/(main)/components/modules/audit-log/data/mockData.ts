// import { User, AuditLogItem } from '../types';

// export const mockUsers: User[] = [
//     { id: '1', name: 'Juan Pérez', email: 'juan.perez@example.com' },
//     { id: '2', name: 'María García', email: 'maria.garcia@example.com' },
//     { id: '3', name: 'Carlos López', email: 'carlos.lopez@example.com' },
//     // { id: '4', name: 'Ana Martínez', email: 'ana.martinez@example.com' },
//     { id: '4', name: 'Juan Pérez', email: 'juan.perez@example.com' },
//     { id: '5', name: 'Pedro Sánchez', email: 'pedro.sanchez@example.com' }
// ];

// export const mockAuditLogs: AuditLogItem[] = [
//     {
//         id: '1',
//         user: mockUsers[0],
//         created_at: '2025-03-15T10:30:00Z',
//         module: 'Encuestas',
//         action: 'Crear',
//         description: 'Se creó una nueva encuesta de satisfacción',
//         metadata: {
//             Antes: {},
//             Despues: {
//                 titulo: 'Encuesta de Satisfacción 2024',
//                 descripcion: 'Encuesta para medir la satisfacción de los usuarios',
//                 estado: 'Activa'
//             }
//         }
//     },
//     {
//         id: '2',
//         user: mockUsers[1],
//         created_at: '2024-03-15T11:15:00Z',
//         module: 'Preguntas',
//         action: 'Modificar',
//         description: 'Se modificó la pregunta sobre la experiencia del usuario',
//         metadata: {
//             Antes: {
//                 texto: '¿Cómo calificaría su experiencia?',
//                 tipo: 'Escala'
//             },
//             Despues: {
//                 texto: '¿Cómo calificaría su experiencia general?',
//                 tipo: 'Escala',
//                 opciones: ['1', '2', '3', '4', '5']
//             }
//         }
//     },
//     {
//         id: '3',
//         user: mockUsers[2],
//         created_at: '2024-03-15T12:00:00Z',
//         module: 'Respuestas',
//         action: 'Eliminar',
//         description: 'Se eliminó una respuesta duplicada',
//         metadata: {
//             Antes: {
//                 respuesta: 'Muy satisfecho',
//                 fecha: '2024-03-14T15:30:00Z'
//             },
//             Despues: {}
//         }
//     },
//     {
//         id: '4',
//         user: mockUsers[3],
//         created_at: '2024-03-15T13:45:00Z',
//         module: 'Usuarios',
//         action: 'Ver',
//         description: 'Se consultó el perfil de un usuario',
//         metadata: {
//             Antes: {},
//             Despues: {
//                 nombre: 'Roberto Díaz',
//                 email: 'roberto.diaz@example.com',
//                 rol: 'Administrador'
//             }
//         }
//     },
//     {
//         id: '5',
//         user: mockUsers[4],
//         created_at: '2024-03-15T14:30:00Z',
//         module: 'Permisos',
//         action: 'Modificar',
//         description: 'Se actualizaron los permisos de acceso',
//         metadata: {
//             Antes: {
//                 permisos: ['lectura', 'escritura']
//             },
//             Despues: {
//                 permisos: ['lectura', 'escritura', 'administración']
//             }
//         }
//     }
// ]; 