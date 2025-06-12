import { MenuItem } from 'primereact/menuitem';

export interface CustomMenuItem extends MenuItem {
    permission?: string;
} 