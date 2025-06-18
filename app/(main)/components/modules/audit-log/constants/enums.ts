export enum AuditModule {
    USER = 'USER',
    PROJECT = 'PROJECT',
    SURVEY = 'SURVEY',
    QUESTION = 'QUESTION',
    ANSWER = 'ANSWER',
    AUTH = 'AUTH'
}

export enum AuditEvent {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    READ = 'READ',
    LOGIN = 'LOGIN'
}

export const ModuleTranslations: Record<AuditModule, string> = {
    [AuditModule.USER]: 'Usuarios',
    [AuditModule.PROJECT]: 'Proyectos',
    [AuditModule.SURVEY]: 'Encuestas',
    [AuditModule.QUESTION]: 'Preguntas',
    [AuditModule.ANSWER]: 'Respuestas',
    [AuditModule.AUTH]: 'Autenticación'
};

export const EventTranslations: Record<AuditEvent, string> = {
    [AuditEvent.CREATE]: 'Crear',
    [AuditEvent.UPDATE]: 'Actualizar',
    [AuditEvent.DELETE]: 'Eliminar',
    [AuditEvent.READ]: 'Leer',
    [AuditEvent.LOGIN]: 'Inicio de sesión'
};

export const ModuleIcons: Record<AuditModule, string> = {
    [AuditModule.USER]: 'pi pi-user',
    [AuditModule.PROJECT]: 'pi pi-folder',
    [AuditModule.SURVEY]: 'pi pi-list',
    [AuditModule.QUESTION]: 'pi pi-question-circle',
    [AuditModule.ANSWER]: 'pi pi-check-square',
    [AuditModule.AUTH]: 'pi pi-lock'
};

export const EventIcons: Record<AuditEvent, string> = {
    [AuditEvent.CREATE]: 'pi pi-plus',
    [AuditEvent.UPDATE]: 'pi pi-pencil',
    [AuditEvent.DELETE]: 'pi pi-trash',
    [AuditEvent.READ]: 'pi pi-eye',
    [AuditEvent.LOGIN]: 'pi pi-sign-in'
};

type TagSeverity = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast';

export const EventColors: Record<AuditEvent, TagSeverity> = {
    [AuditEvent.CREATE]: 'success',
    [AuditEvent.UPDATE]: 'warning',
    [AuditEvent.DELETE]: 'danger',
    [AuditEvent.READ]: 'info',
    [AuditEvent.LOGIN]: 'secondary'
};

export const EventBackgroundColors: Record<AuditEvent, string> = {
    [AuditEvent.CREATE]: '#22C55E', // Verde
    [AuditEvent.UPDATE]: '#F59E0B', // Amarillo
    [AuditEvent.DELETE]: '#EF4444', // Rojo
    [AuditEvent.READ]: '#3B82F6',   // Azul
    [AuditEvent.LOGIN]: '#6366F1'   // Indigo
};

export const ModuleColors: Record<AuditModule, string> = {
    [AuditModule.USER]: '#06B6D4',      // Cyan
    [AuditModule.PROJECT]: '#6366F1',    // Indigo
    [AuditModule.SURVEY]: '#A855F7',     // Púrpura
    [AuditModule.QUESTION]: '#F97316',   // Naranja
    [AuditModule.ANSWER]: '#14B8A6',     // Teal
    [AuditModule.AUTH]: '#8B5CF6'        // Violeta
}; 