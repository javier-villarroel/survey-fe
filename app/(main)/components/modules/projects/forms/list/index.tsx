'use client';

import { DynamicTable } from "@/app/(main)/components/common/components/table/DynamicTable";
import { useProjectsTable } from "../../hooks/useProjectsTable";
import { Project } from "../../services/types";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FilterMatchMode } from 'primereact/api';
import { TableColumn, TablePaginationParams } from '@/app/(main)/components/common/components/table/types';
import { confirmDialog } from 'primereact/confirmdialog';
import { createActions } from "./config/actions";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const ListProjects = () => {
    const { data, pagination, loading, onTableChange, handleFilter } = useProjectsTable();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const router = useRouter();

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        // Por ahora solo seleccionamos el proyecto, la edición se implementará después
        console.log('Editar proyecto:', project);
    };

    const handleDelete = async (projectId: string) => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar este proyecto?',
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'No, cancelar',
            accept: () => {
                // Por ahora solo mostramos en consola, la eliminación se implementará después
                console.log('Eliminar proyecto:', projectId);
            }
        });
    };

    const handleToggleStatus = async (project: Project) => {
        const action = project.status === 'active' ? 'desactivar' : 'activar';
        confirmDialog({
            message: `¿Está seguro que desea ${action} este proyecto?`,
            header: `Confirmar ${action}`,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: `Sí, ${action}`,
            rejectLabel: 'No, cancelar',
            accept: () => {
                // Por ahora solo mostramos en consola, el cambio de estado se implementará después
                console.log('Cambiar estado del proyecto:', project);
            }
        });
    };

    const handleCreateQuestionnaire = (project: Project) => {
        router.push(`/proyectos/${project.id}/cuestionario`);
    };

    const handleRoleAssignment = (project: Project) => {
        router.push(`/proyectos/${project.id}/roles`);
    };

    const actions = createActions({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onToggleStatus: handleToggleStatus,
        onCreateQuestionnaire: handleCreateQuestionnaire,
        onRoleAssignment: handleRoleAssignment
    });

    const statusBodyTemplate = (project: Project) => {
        const getStatusConfig = (status: string) => {
            switch (status) {
                case 'active':
                    return {
                        text: 'Activo',
                        className: 'bg-green-50 text-green-700 ring-green-600/20'
                    };
                case 'inactive':
                    return {
                        text: 'Inactivo',
                        className: 'bg-red-50 text-red-700 ring-red-600/20'
                    };
                case 'completed':
                    return {
                        text: 'Completado',
                        className: 'bg-blue-50 text-blue-700 ring-blue-600/20'
                    };
                default:
                    return {
                        text: status,
                        className: 'bg-gray-50 text-gray-700 ring-gray-600/20'
                    };
            }
        };

        const config = getStatusConfig(project.status);
        return (
            <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}
            >
                {config.text}
            </span>
        );
    };

    const dateBodyTemplate = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy', { locale: es });
    };

    const columns: TableColumn[] = [
        {
            field: 'name',
            header: 'Nombre',
            sortable: true,
            filter: true,
            filterPlaceholder: 'Filtrar por nombre',
            style: { minWidth: '14rem', padding: '1rem' }
        },
        {
            field: 'description',
            header: 'Descripción',
            sortable: true,
            filter: true,
            filterPlaceholder: 'Filtrar por descripción',
            style: { minWidth: '16rem', padding: '1rem' }
        },
        {
            field: 'status',
            header: 'Estado',
            sortable: true,
            filter: true,
            filterPlaceholder: 'Filtrar por estado',
            filterMatchModeOptions: [
                { label: 'Es igual a', value: FilterMatchMode.EQUALS },
                { label: 'Contiene', value: FilterMatchMode.CONTAINS },
            ],
            body: statusBodyTemplate,
            style: { minWidth: '10rem', padding: '1rem' }
        },
        {
            field: 'startDate',
            header: 'Fecha de Inicio',
            sortable: true,
            filter: true,
            filterPlaceholder: 'Filtrar por fecha de inicio',
            body: (rowData: any) => dateBodyTemplate(rowData.startDate),
            style: { minWidth: '12rem', padding: '1rem' }
        },
        {
            field: 'endDate',
            header: 'Fecha de Fin',
            sortable: true,
            filter: true,
            filterPlaceholder: 'Filtrar por fecha de fin',
            body: (rowData: Project) => rowData.endDate ? dateBodyTemplate(rowData.endDate) : '-',
            style: { minWidth: '12rem', padding: '1rem' }
        },
        {
            field: 'actions',
            header: 'Acciones',
            style: { minWidth: '8rem', padding: '1rem', textAlign: 'center' }
        }
    ];

    const tableStyle = {
        '--p-datatable-row-height': '4rem'
    } as React.CSSProperties;

    return (
        <>
            <div className="relative w-full mb-4">
                <h2 className="text-2xl font-bold">Gestión de proyectos</h2>
                <div className="absolute right-0 top-0 -mt-1">
                    <Button
                        label="Crear proyecto"
                        icon="pi pi-plus"
                        onClick={() => router.push('/proyectos/crear')}
                        style={{
                            backgroundColor: '#000e28',
                            borderColor: '#000e28'
                        }}
                    />
                </div>
            </div>
            <Card className="w-full shadow-2">
                <div className="overflow-x-auto">
                    <DynamicTable<Project>
                        columns={columns}
                        value={data}
                        loading={loading}
                        onPage={onTableChange}
                        onFilter={handleFilter}
                        totalRecords={pagination?.totalDocs || 0}
                        globalSearchFields={['name', 'description', 'status']}
                        emptyMessage="No se encontraron proyectos"
                        rowsPerPageOptions={[10, 25, 50]}
                        style={tableStyle}
                        className="p-datatable-gridlines"
                        actions={actions}
                    />
                </div>
            </Card>
        </>
    );
};

export default ListProjects; 