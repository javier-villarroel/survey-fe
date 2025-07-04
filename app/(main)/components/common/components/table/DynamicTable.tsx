"use client";

import React, { useRef } from "react";
import { DataTable, DataTableFilterMeta, DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DynamicTableProps, TableColumn, TableAction, TablePaginationParams } from "./types";
import { classNames } from "primereact/utils";

const DEFAULT_FILTER_OPTIONS = [
    { label: 'Contiene', value: FilterMatchMode.CONTAINS },
    { label: 'Es igual a', value: FilterMatchMode.EQUALS },
    { label: 'Comienza con', value: FilterMatchMode.STARTS_WITH },
    { label: 'Termina con', value: FilterMatchMode.ENDS_WITH },
];

const ActionsCell = <T extends object>({ rowData, actions }: { rowData: T; actions: TableAction[] }) => {
    const menuRef = useRef<Menu>(null);
    
    const menuItems = actions.map(action => ({
        label: action.getLabel ? action.getLabel(rowData) : action.label,
        icon: action.getIcon ? action.getIcon(rowData) : action.icon,
        className: action.getClassName ? action.getClassName(rowData) : action.className,
        command: () => action.onClick(rowData)
    }));

    return (
        <div className="flex justify-center">
            <Menu model={menuItems} popup ref={menuRef} />
            <Button
                type="button"
                icon="pi pi-ellipsis-v"
                className="p-button-rounded p-button-text"
                onClick={(e) => menuRef.current?.toggle(e)}
                aria-label="Opciones"
            />
        </div>
    );
};

export function DynamicTable<T extends Record<string, any>>({
    columns,
    value,
    loading,
    onPage,
    onFilter,
    totalRecords,
    totalPages = 1,
    title,
    createButton,
    actions,
    defaultFilters,
    defaultSort,
    rowsPerPageOptions = [5, 10, 25, 50],
    globalSearchFields,
    emptyMessage = "No se encontraron registros",
    className,
    style,
    showPaginator = true
}: DynamicTableProps<T> & { showPaginator?: boolean; totalPages?: number }) {
    const [filters, setFilters] = React.useState<DataTableFilterMeta>(() => {
        const initialFilters: DataTableFilterMeta = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        };

        columns.forEach(column => {
            if (column.filter) {
                initialFilters[column.field] = {
                    operator: FilterOperator.AND,
                    constraints: [{ value: null, matchMode: column.filterMatchMode || FilterMatchMode.CONTAINS }]
                };
            }
        });

        return initialFilters;
    });

    const [globalFilterValue, setGlobalFilterValue] = React.useState("");

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGlobalFilterValue(value);

        const newFilters = {
            ...filters,
            global: { value, matchMode: FilterMatchMode.CONTAINS }
        };
        
        setFilters(newFilters);
        
        if (onFilter) {
            onFilter({
                page: 1,
                limit: rowsPerPageOptions[0],
                filters: newFilters
            });
        }
    };

    const handlePage = (event: DataTableStateEvent) => {
        if (onPage && event.page !== undefined && event.rows !== undefined) {
            onPage(event);
        }
    };

    const handleFilter = (event: DataTableStateEvent) => {
        console.log('Filter event:', event);
        const newFilters = event.filters as DataTableFilterMeta;
        setFilters(newFilters);
        
        if (onFilter) {
            onFilter({
                page: 1,
                limit: rowsPerPageOptions[0],
                filters: newFilters
            });
        }
    };

    const clearAllFilters = () => {
        const clearedFilters: DataTableFilterMeta = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        };

        columns.forEach(column => {
            if (column.filter) {
                clearedFilters[column.field] = {
                    operator: FilterOperator.AND,
                    constraints: [{ value: null, matchMode: column.filterMatchMode || FilterMatchMode.CONTAINS }]
                };
            }
        });

        setFilters(clearedFilters);
        setGlobalFilterValue("");
        
        if (onFilter) {
            onFilter({
                page: 1,
                limit: rowsPerPageOptions[0],
                filters: clearedFilters
            });
        }
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between gap-2">
                <div>
                    <h5 className="m-0">{title}</h5>
                </div>
                <div className="flex gap-2">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Buscar..."
                            className="p-inputtext-sm"
                        />
                    </span>
                    {createButton && (
                        <Button
                            label={createButton.label}
                            icon="pi pi-plus"
                            onClick={createButton.onClick}
                        />
                    )}
                </div>
            </div>
        );
    };

    const actionsBodyTemplate = (rowData: T) => {
        return <ActionsCell rowData={rowData} actions={actions || []} />;
    };

    const defaultStyle = {
        '--p-datatable-header-height': '4rem',
        '--p-datatable-row-height': '5rem'
    } as React.CSSProperties;

    const header = title || createButton ? renderHeader() : undefined;

    return (
        <div className="card">
            <div className="mb-3 flex justify-end">
                <Button
                    label="Limpiar filtros"
                    icon="pi pi-filter-slash"
                    className="p-button-outlined p-button-danger"
                    onClick={clearAllFilters}
                />
            </div>
            <DataTable
                value={value}
                lazy
                dataKey="id"
                paginator={showPaginator}
                first={0}
                rows={rowsPerPageOptions[0]}
                totalRecords={totalRecords}
                loading={loading}
                onPage={handlePage}
                onFilter={handleFilter}
                filters={filters}
                filterDisplay="menu"
                header={header}
                globalFilterFields={globalSearchFields}
                emptyMessage={emptyMessage}
                className={`p-datatable-sm ${className || ''}`}
                stripedRows
                showGridlines
                responsiveLayout="scroll"
                rowsPerPageOptions={rowsPerPageOptions}
                style={{ ...defaultStyle, ...style }}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate={`Página {currentPage} de ${totalPages} (Total: {totalRecords} registros)`}
                paginatorLeft={<div className="px-3">Total: {totalRecords} registros</div>}
            >
                {columns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable={col.sortable}
                        filter={col.filter}
                        filterPlaceholder={col.filterPlaceholder}
                        filterMatchMode={col.filterMatchMode || FilterMatchMode.CONTAINS}
                        filterMatchModeOptions={col.filterMatchModeOptions || DEFAULT_FILTER_OPTIONS}
                        style={col.style}
                        body={col.body}
                        showFilterMenu={true}
                        showFilterOperator={false}
                        showAddButton={false}
                        showApplyButton={true}
                        showClearButton={true}
                    />
                ))}
                {actions && actions.length > 0 && (
                    <Column
                        body={actionsBodyTemplate}
                        style={{ width: '5rem' }}
                        header="Acciones"
                    />
                )}
            </DataTable>
            <style jsx global>{`
                .p-datatable .p-datatable-emptymessage td {
                    text-align: center !important;
                    padding: 2rem !important;
                }
            `}</style>
        </div>
    );
} 