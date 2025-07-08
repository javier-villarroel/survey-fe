import { FilterMatchMode } from "primereact/api";
import { TableColumn } from "@/app/(main)/components/common/components/table/types";
import { IUser } from "../../../services/types";
import { UserStatus, UserRoles } from "../../../lib/enums";
import { Dropdown } from "primereact/dropdown";

const roleOptions = [
    { label: 'Todos', value: '' },
    { label: 'Administrador', value: UserRoles.ADMIN },
    { label: 'Sin rol', value: 'NO_ROLE' }
];

const statusOptions = [
    { label: 'Todos', value: '' },
    { label: 'Activo', value: UserStatus.ACTIVE },
    { label: 'Suspendido', value: UserStatus.SUSPENDED },
    { label: 'Bloqueado', value: UserStatus.BLOQUED }
];

const statusBodyTemplate = (user: IUser) => {
    let label = "Inactivo";
    let bgClass = "bg-red-700 text-white";

    if (user.status === UserStatus.ACTIVE) {
        label = "Activo";
        bgClass = "bg-green-700 text-white";
    } else if (user.status === UserStatus.BLOQUED) {
        label = "Bloqueado";
        bgClass = "bg-yellow-600 text-white";
    } else if (user.status === UserStatus.SUSPENDED) {
        label = "Suspendido";
        bgClass = "bg-gray-500 text-white";
    }

    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${bgClass}`}
        >
            {label}
        </span>
    );
};

const roleBodyTemplate = (user: IUser) => {
    return user.role?.name || 'Sin rol';
};

const roleFilterTemplate = (options: any) => {
    return (
        <Dropdown
            value={options.value}
            options={roleOptions}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder="Seleccionar rol"
            className="p-column-filter w-full"
        />
    );
};

const statusFilterTemplate = (options: any) => {
    return (
        <Dropdown
            value={options.value}
            options={statusOptions}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder="Seleccionar estado"
            className="p-column-filter w-full"
        />
    );
};

export const columns: TableColumn[] = [
    {
        field: "id",
        header: "ID",
        sortable: true,
        filterPlaceholder: "Filtrar por ID",
        style: { minWidth: '12rem' }
    },
    {
        field: "firstName",
        header: "Nombre",
        sortable: true,
        filter: true,
        filterPlaceholder: "Filtrar por nombre",
        style: { minWidth: '12rem' }
    },
    {
        field: "lastName",
        header: "Apellido",
        sortable: true,
        filter: true,
        filterPlaceholder: "Filtrar por apellido",
        style: { minWidth: '12rem' }
    },
    {
        field: "email",
        header: "Email",
        sortable: true,
        filter: true,
        filterPlaceholder: "Filtrar por email",
        style: { minWidth: '14rem' }
    },
    {
        field: "role.name",
        header: "Rol",
        sortable: true,
        filter: true,
        body: roleBodyTemplate,
        filterMatchMode: FilterMatchMode.EQUALS,
        filterMatchModeOptions: [{ label: 'Es igual a', value: FilterMatchMode.EQUALS }],
        filterOptions: roleOptions,
        style: { minWidth: '10rem' }
    },
    {
        field: "status",
        header: "Estado",
        sortable: true,
        filter: true,
        body: statusBodyTemplate,
        filterMatchMode: FilterMatchMode.EQUALS,
        filterMatchModeOptions: [{ label: 'Es igual a', value: FilterMatchMode.EQUALS }],
        filterOptions: statusOptions,
        style: { minWidth: '8rem' }
    }
];