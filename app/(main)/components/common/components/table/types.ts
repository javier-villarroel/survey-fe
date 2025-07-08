import { DataTableFilterMeta, DataTableStateEvent } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";

export interface TableAction {
    label: string;
    icon: string;
    className?: string;
    onClick: (rowData: any) => void;
    getLabel?: (rowData: any) => string;
    getIcon?: (rowData: any) => string;
    getClassName?: (rowData: any) => string;
    disabled?: (rowData: any) => boolean;
}

export interface TableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    filter?: boolean;
    filterPlaceholder?: string;
    filterOptions?: { label: string; value: any }[];
    body?: (rowData: any) => React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export interface TablePaginationParams {
    page: number;
    limit: number;
    search?: string;
    filters?: Record<string, any>;
}

export interface TablePaginationInfo {
    total: number;
    page: number;
    limit: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    totalPages?: number;
}

export interface DynamicTableProps<T> {
    columns: TableColumn[];
    value: T[];
    loading: boolean;
    onPage: (event: DataTableStateEvent) => void;
    onFilter: (params: TablePaginationParams) => void;
    totalRecords: number;
    title?: string;
    createButton?: {
        label: string;
        onClick: () => void;
    };
    actions?: TableAction[];
    defaultFilters?: DataTableFilterMeta;
    defaultSort?: {
        field: string;
        order: 1 | -1;
    };
    rowsPerPageOptions?: number[];
    globalSearchFields?: string[];
    emptyMessage?: string;
    className?: string;
    style?: React.CSSProperties;
} 