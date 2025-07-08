import { AxiosError } from "axios";
import { IUsersListResponse } from "./types";
import apiWithAuth from "@/app/api/axios";
import { USER_API_BASE } from "./constants";
import { UserRoles } from "../lib/enums";

interface Pagination {
    page: number;
    limit: number;
}

interface QueryFilter {
    field: string;
    text: string;
    operator?: string;
}

interface GetUsersParams {
    page: number;
    limit: number;
    filters?: Record<string, any>;
}

const convertFiltersToQueries = (filters: Record<string, any>): QueryFilter[] => {
    const queries: QueryFilter[] = [];

    if (!filters) return queries;

    Object.entries(filters).forEach(([field, value]) => {
        // Si el valor es un objeto de filtro de PrimeReact
        if (value && typeof value === 'object' && 'value' in value) {
            const filterValue = value.value;
            
            // No agregamos el filtro si:
            // - El valor es null/undefined/vacío
            // - El valor es un objeto (evita "[object Object]")
            if (filterValue === null || 
                filterValue === undefined || 
                filterValue === '' ||
                (typeof filterValue === 'object' && filterValue !== null)) {
                return;
            }

            // Mapear los campos del frontend a los campos del backend
            let backendField = field;
            let backendValue = filterValue;
            let operator: string | undefined;

            switch (field) {
                case 'role.name':
                    if (filterValue === 'NO_ROLE') {
                        backendField = 'roleId';
                        backendValue = UserRoles.ADMIN.toString();
                        operator = 'ne'; // not equals
                    } else if (filterValue === UserRoles.ADMIN) {
                        backendField = 'roleId';
                        backendValue = UserRoles.ADMIN.toString();
                        operator = 'eq'; // equals
                    }
                    break;
                case 'status':
                    backendField = 'status';
                    operator = 'eq';
                    break;
                default:
                    backendField = field;
            }

            queries.push({
                field: backendField,
                text: backendValue.toString(),
                ...(operator && { operator })
            });
        }
    });

    return queries;
};

export const getUsersService = async ({ page, limit, filters }: GetUsersParams): Promise<IUsersListResponse> => {
    try {
        const pagination: Pagination = { page, limit };
        const queries = convertFiltersToQueries(filters || {});

        const { data } = await apiWithAuth.get<IUsersListResponse>(`${USER_API_BASE}/table`, {
            params: {
                pagination: JSON.stringify(pagination),
                ...(queries.length > 0 && { queries: JSON.stringify(queries) }),
                ordering: JSON.stringify({ createdAt: "desc" })
            }
        });

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.info?.message_to_show || "Error al obtener los usuarios");
        }
        throw error;
    }
}; 