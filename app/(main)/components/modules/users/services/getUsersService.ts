import { AxiosError } from "axios";
import { toast } from "sonner";
import apiWithAuth from "@/app/api/axios";
import { IUsersListResponse } from "./types";
import { USER_API_BASE } from "./constants";

interface QueryFilter {
    field: string;
    text: string;
}

interface Pagination {
    page: number;
    limit: number;
}

export const getUsersService = async (pagination: Pagination, filters?: Record<string, any>) => {
    try {
        // Construir los queries basados en los filtros
        const queries: QueryFilter[] = [];
        
        if (filters) {
            if (filters.userName) {
                queries.push({ field: 'userName', text: filters.userName });
            }
            if (filters.name) {
                queries.push({ field: 'name', text: filters.name });
            }
            if (filters.lastName) {
                queries.push({ field: 'lastName', text: filters.lastName });
            }
            if (filters.email) {
                queries.push({ field: 'email', text: filters.email });
            }
            if (filters.role) {
                queries.push({ field: 'role', text: filters.role });
            }
            if (filters.status !== undefined) {
                queries.push({ field: 'status', text: filters.status.toString() });
            }
        }

        // Construir los parámetros de la URL
        const params = {
            pagination: JSON.stringify(pagination),
            ...(queries.length > 0 && { queries: JSON.stringify(queries) }),
            ordering: JSON.stringify({ createdAt: "desc" })
        };

        // Convertir los parámetros a string de consulta
        const queryString = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            queryString.append(key, value);
        });

        const { data } = await apiWithAuth.get<IUsersListResponse>(
            `${USER_API_BASE}/table?${queryString}`
        );
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data?.info?.message_to_show || "Error al obtener usuarios");
        }
        throw error;
    }
}; 