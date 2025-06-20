import { CustomMenuItem } from './types';

export const menuItems: CustomMenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        url: '/'
    },
    {
        label: 'Configuración',
        icon: 'pi pi-cog',
        items: [
            {
                label: 'Bitácora',
                icon: 'pi pi-history',
                url: '/bitacora',
                permission: 'audit_log.view'
            }
            // ... otros items de configuración
        ]
    }
]; 