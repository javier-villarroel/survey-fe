import { MenuItem } from 'primereact/menuitem';

export interface CustomMenuItem extends MenuItem {
    permission?: string;
    label: string;
    icon?: string;
    url?: string;
    items?: CustomMenuItem[];
} 