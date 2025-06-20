"use client";

import React, { useRef } from "react";
import { DataTable, DataTableFilterMeta, DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DynamicTableProps, TableColumn, TableAction } from "./types";
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
    title,
    createButton,
    actions,
    defaultFilters,
    defaultSort,
    rowsPerPageOptions = [5, 10, 25, 50],
    globalSearchFields,
    emptyMessage = "No se encontraron registros",
    className,
    style
}: DynamicTableProps<T>) {
    const [filters, setFilters] = React.useState<DataTableFilterMeta>(
        defaultFilters || {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            ...columns.reduce((acc, column) => {
                if (column.filter) {
                    acc[column.field] = {
                        operator: FilterOperator.AND,
                        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
                    };
                }
                return acc;
            }, {} as DataTableFilterMeta)
        }
    );

    const [globalFilterValue, setGlobalFilterValue] = React.useState("");

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            global: { value, matchMode: FilterMatchMode.CONTAINS },
        }));
        
        if (onFilter) {
            onFilter({
                page: 0,
                limit: rowsPerPageOptions[0],
                search: value,
                filters
            });
        }
    };

    const handlePage = (event: DataTableStateEvent) => {
        if (onPage && event.page !== undefined && event.rows !== undefined) {
            onPage(event);
        }
    };

    const handleFilter = (event: any) => {
        const newFilters = { ...event.filters };
        setFilters(newFilters);
        
        if (onFilter) {
            const searchValues = Object.values(newFilters)
                .map((filter: any) => {
                    if (filter.constraints) {
                        return filter.constraints.map((constraint: any) => constraint.value).filter(Boolean);
                    }
                    return filter.value;
                })
                .flat()
                .filter(Boolean);

            onFilter({
                page: 1,
                limit: rowsPerPageOptions[0],
                search: searchValues.join(" "),
                filters: newFilters
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
            <DataTable
                value={value}
                lazy
                dataKey="id"
                paginator
                first={0}
                rows={10}
                totalRecords={totalRecords}
                loading={loading}
                onPage={handlePage}
                onFilter={handleFilter}
                filters={filters}
                header={header}
                filterDisplay="row"
                globalFilterFields={globalSearchFields}
                emptyMessage={emptyMessage}
                className={`p-datatable-sm ${className || ''}`}
                stripedRows
                showGridlines
                responsiveLayout="scroll"
                rowsPerPageOptions={[10, 25, 50]}
                style={{ ...defaultStyle, ...style }}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Página {currentPage} de {totalPages} (Total: {totalRecords} registros)"
                paginatorLeft={<div className="px-3">Total: {totalRecords} registros</div>}
            >
                {columns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable={col.sortable}
                        filter={col.filter}
                        filterField={col.field}
                        filterPlaceholder={col.filterPlaceholder || `Filtrar por ${col.header.toLowerCase()}`}
                        showFilterMenu={false}
                        filterMatchModeOptions={
                            col.filterMatchModeOptions || DEFAULT_FILTER_OPTIONS
                        }
                        body={col.body}
                        style={col.style || { minWidth: '15rem' }}
                        showFilterOperator={false}
                        showAddButton={false}
                        showFilterMatchModes={false}
                        showClearButton={false}
                    />
                ))}
                {actions && actions.length > 0 && (
                    <Column
                        header="Acciones"
                        body={actionsBodyTemplate}
                        style={{ minWidth: '10rem' }}
                        headerStyle={{ textAlign: 'center' }}
                    />
                )}
            </DataTable>
        </div>
    );
} 