import { FilterMatchMode } from "primereact/api";
import { TableColumn } from "@/app/(main)/components/common/components/table/types";
import { IUser } from "../../../services/types";

const statusBodyTemplate = (user: IUser) => {
    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                user.status
                    ? "bg-green-50 text-green-700 ring-green-600/20"
                    : "bg-red-50 text-red-700 ring-red-600/20"
            }`}
        >
            {user.status ? "Activo" : "Inactivo"}
        </span>
    );
};

export const columns: TableColumn[] = [
    {
        field: "id",
        header: "ID",
        sortable: true,
        filter: true,
        filterPlaceholder: "Filtrar por ID",
        style: { minWidth: '12rem' }
    },
    {
        field: "userName",
        header: "Usuario",
        sortable: true,
        filter: true,
        filterPlaceholder: "Filtrar por usuario",
        style: { minWidth: '12rem' }
    },
    {
        field: "name",
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
        filterPlaceholder: "Filtrar por rol",
        filterMatchModeOptions: [
            { label: 'Es igual a', value: FilterMatchMode.EQUALS },
            { label: 'Contiene', value: FilterMatchMode.CONTAINS },
        ],
        style: { minWidth: '10rem' }
    },
    {
        field: "status",
        header: "Estado",
        sortable: true,
        body: statusBodyTemplate,
        style: { minWidth: '8rem' }
    }
]; 