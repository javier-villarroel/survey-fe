"use client";

import React, { useRef } from "react";
import { DataTable, DataTableFilterMeta, DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { FilterMatchMode } from "primereact/api";
import { DynamicTableProps, TableColumn, TableAction } from "./types";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";

const ActionsCell = <T extends object>({ rowData, actions }: { rowData: T; actions: TableAction[] }) => {
    const menuRef = useRef<Menu>(null);
    
    const menuItems = actions.map(action => ({
        label: action.getLabel ? action.getLabel(rowData) : action.label,
        icon: action.getIcon ? action.getIcon(rowData) : action.icon,
        className: action.getClassName ? action.getClassName(rowData) : action.className,
        command: () => action.onClick(rowData),
        disabled: action.disabled ? action.disabled(rowData) : false
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
    totalPages,
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
    showFilters = true,
    showPaginator = true
}: DynamicTableProps<T>) {
    const [filters, setFilters] = React.useState<DataTableFilterMeta>(() => {
        const initialFilters: DataTableFilterMeta = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        };

        if (showFilters) {
            columns.forEach(column => {
                if (column.filter) {
                    initialFilters[column.field] = { value: null, matchMode: FilterMatchMode.CONTAINS };
                }
            });
        }

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

        if (showFilters) {
            columns.forEach(column => {
                if (column.filter) {
                    clearedFilters[column.field] = { value: null, matchMode: FilterMatchMode.CONTAINS };
                }
            });
        }

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

    const renderFilterElement = (col: TableColumn) => {
        if (!showFilters) return null;

        if (col.filterOptions) {
            return (
                <Dropdown
                    value={(filters[col.field] as any)?.value}
                    options={col.filterOptions}
                    onChange={(e) => {
                        const newFilters = { ...filters };
                        newFilters[col.field] = { value: e.value, matchMode: FilterMatchMode.EQUALS };
                        setFilters(newFilters);
                        
                        if (onFilter) {
                            onFilter({
                                page: 1,
                                limit: rowsPerPageOptions[0],
                                filters: newFilters
                            });
                        }
                    }}
                    placeholder={col.filterPlaceholder || "Seleccionar..."}
                    className="p-column-filter w-full"
                />
            );
        }

        return (
            <InputText
                value={(filters[col.field] as any)?.value || ''}
                onChange={(e) => {
                    const newFilters = { ...filters };
                    newFilters[col.field] = { value: e.target.value, matchMode: FilterMatchMode.CONTAINS };
                    setFilters(newFilters);
                    
                    if (onFilter) {
                        onFilter({
                            page: 1,
                            limit: rowsPerPageOptions[0],
                            filters: newFilters
                        });
                    }
                }}
                placeholder={col.filterPlaceholder || "Buscar..."}
                className="p-column-filter w-full"
            />
        );
    };

    const actionsBodyTemplate = (rowData: T) => {
        return <ActionsCell rowData={rowData} actions={actions || []} />;
    };

    const defaultStyle = {
        '--p-datatable-header-height': '4rem',
        '--p-datatable-row-height': '5rem'
    } as React.CSSProperties;

    const customStyles = `
        .p-column-filter-menu-button,
        .p-column-filter-operator,
        .p-column-filter-constraints,
        .p-column-filter-add-rule,
        .p-column-filter-buttonbar {
            display: none !important;
        }
    `;

    const header = title || createButton ? renderHeader() : undefined;

    return (
        <div className="card">
            <style>{customStyles}</style>
            {showFilters && (
                <div className="mb-3 flex justify-end w-full">
                    <div className="flex w-full">
                        <div className="flex-1" />
                        <Button
                            label="Limpiar filtros"
                            icon="pi pi-filter-slash"
                            className="p-button-outlined p-button-danger"
                            onClick={clearAllFilters}
                        />
                    </div>
                </div>
            )}
            <DataTable
                value={value}
                lazy
                dataKey="id"
                paginator={showPaginator}
                rows={rowsPerPageOptions[0]}
                totalRecords={totalRecords}
                onPage={handlePage}
                onFilter={handleFilter}
                filters={filters}
                loading={loading}
                header={header}
                emptyMessage={emptyMessage}
                className={classNames("p-datatable-sm", className)}
                style={{ ...defaultStyle, ...style }}
                showGridlines
                stripedRows
                filterDisplay={showFilters ? "row" : "menu"}
                rowsPerPageOptions={rowsPerPageOptions}
            >
                {columns.map((col, i) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable={col.sortable}
                        filter={showFilters && col.filter}
                        filterElement={showFilters && col.filter ? () => renderFilterElement(col) : undefined}
                        body={col.body}
                        style={col.style}
                        className={col.className}
                        filterMatchMode={col.filterMatchMode}
                        filterMatchModeOptions={col.filterMatchModeOptions}
                    />
                ))}
                {actions && actions.length > 0 && (
                    <Column
                        body={actionsBodyTemplate}
                        style={{ width: '4rem' }}
                        className="text-center"
                    />
                )}
            </DataTable>
        </div>
    );
} 