'use client';

import React from 'react';
import { DynamicTable } from '@/app/(main)/components/common/components/table/DynamicTable';
import { TableColumn } from '@/app/(main)/components/common/components/table/types';
import { useRoleAssignment } from './hooks/useRoleAssignment';

export const RoleAssignment: React.FC = () => {
    const {
        users,
        loading,
        totalRecords,
        handlePage,
        handleFilter
    } = useRoleAssignment();

    const columns: TableColumn[] = [
        {
            field: 'name',
            header: 'Nombre',
            sortable: true,
            filter: true
        },
        {
            field: 'email',
            header: 'Correo',
            sortable: true,
            filter: true
        },
        {
            field: 'role',
            header: 'Rol',
            sortable: true,
            filter: true
        },
        {
            field: 'status',
            header: 'Estado',
            sortable: true,
            filter: true,
            body: (rowData) => (
                <span className={`status-badge status-${rowData.status.toLowerCase()}`}>
                    {rowData.status}
                </span>
            )
        }
    ];

    const actions = [
        {
            label: 'Gerente de Proyecto',
            icon: 'pi pi-briefcase', // ícono representativo de gerente/proyecto
            onClick: (rowData: any) => {
                console.log('Asignar rol a:', rowData);
            }
        },
        {
            label: 'Reclutador',
            icon: 'pi pi-users', // ícono representativo de reclutador
            className: 'text-blue-600',
            onClick: (rowData: any) => {
                console.log('Remover rol de:', rowData);
            }
        },
        {
            label: 'Administrador de pagos',
            icon: 'pi pi-credit-card', // ícono representativo de pagos
            className: 'text-green-600',
            onClick: (rowData: any) => {
                console.log('Remover rol de:', rowData);
            }
        }
    ];

    return (
        <div className="card">
            <h2>Asignación de Roles</h2>
            <DynamicTable
                columns={columns}
                value={users}
                loading={loading}
                onPage={handlePage}
                onFilter={handleFilter}
                totalRecords={totalRecords}
                title="Usuarios del Proyecto"
                actions={actions}
                globalSearchFields={['name', 'email', 'role']}
                emptyMessage="No hay usuarios asignados"
            />
        </div>
    );
}; 