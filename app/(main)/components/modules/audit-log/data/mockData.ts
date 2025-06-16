export const mockUsers = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, name: 'María García', email: 'maria.garcia@example.com' },
    { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com' },
    { id: 4, name: 'Ana Martínez', email: 'ana.martinez@example.com' },
    { id: 5, name: 'Roberto Sánchez', email: 'roberto.sanchez@example.com' }
];

export const mockAuditLogs = [
    {
        id: 1,
        user: mockUsers[0],
        created_at: '2024-03-15T10:30:00',
        module: 'Usuarios',
        action: 'Crear',
        description: 'Se creó un nuevo usuario en el sistema',
        metadata: {
            Antes: {},
            Despues: {
                nombre: 'Juan Pérez',
                email: 'juan.perez@example.com',
                rol: 'editor'
            }
        }
    },
    {
        id: 2,
        user: mockUsers[1],
        created_at: '2024-03-15T11:45:00',
        module: 'Usuarios',
        action: 'Modificar',
        description: 'Se actualizó la información del usuario',
        metadata: {
            Antes: {
                nombre: 'María',
                rol: 'editor'
            },
            Despues: {
                nombre: 'María García',
                rol: 'administrador'
            }
        }
    },
    {
        id: 3,
        user: mockUsers[2],
        created_at: '2024-03-15T14:20:00',
        module: 'Configuración',
        action: 'Modificar',
        description: 'Se actualizó la configuración del sistema',
        metadata: {
            Antes: {
                tema: 'claro',
                idioma: 'es'
            },
            Despues: {
                tema: 'oscuro',
                idioma: 'en'
            }
        }
    },
    {
        id: 4,
        user: mockUsers[3],
        created_at: '2024-03-15T16:15:00',
        module: 'Documentos',
        action: 'Eliminar',
        description: 'Se eliminó un documento del sistema',
        metadata: {
            Antes: {
                nombre: 'documento.pdf',
                tamaño: '2.5MB',
                tipo: 'PDF'
            },
            Despues: {}
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
    {
        id: 5,
        user: mockUsers[4],
        created_at: '2024-03-15T17:30:00',
        module: 'Permisos',
        action: 'Modificar',
        description: 'Se actualizaron los permisos de acceso',
        metadata: {
            Antes: {
                nivel: 'básico',
                accesos: ['lectura']
            },
            Despues: {
                nivel: 'avanzado',
                accesos: ['lectura', 'escritura', 'administración']
            }
        }
    },
]; 