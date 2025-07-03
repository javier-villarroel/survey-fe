import { useState } from "react";
import { useApi } from "@/app/hooks/useApi";
import { IUser, ICreateUserRequest, IUpdateUserRequest, IUsersListResponse, IUserResponse } from "../services/types";
import { TablePaginationParams } from "@/app/(main)/components/common/components/table/types";
import { FilterMatchMode } from "primereact/api";

interface Pagination {
    page: number;
    limit: number;
}

interface QueryFilter {
    field: string;
    text: string;
}

export const useUsers = () => {
    const api = useApi();
    const [loading, setLoading] = useState(false);

    const convertFiltersToQueries = (filters: Record<string, any>): QueryFilter[] => {
        const queries: QueryFilter[] = [];

        Object.entries(filters).forEach(([field, filter]) => {
            // Solo procesar si hay un valor de filtro
            if (filter && filter.value !== undefined && filter.value !== '') {
                // Manejar campos anidados (como role.name)
                const actualField = field.includes('.') ? field.split('.').pop()! : field;
                
                // Si el modo de filtro es EQUALS, usamos el valor exacto
                // Si es CONTAINS o cualquier otro, lo tratamos como búsqueda parcial
                const filterValue = filter.matchMode === FilterMatchMode.EQUALS 
                    ? filter.value
                    : filter.value;

                queries.push({
                    field: actualField,
                    text: filterValue
                });
            }
        });

        return queries;
    };

    const getUsers = async (params: TablePaginationParams): Promise<IUsersListResponse> => {
        try {
            setLoading(true);
            const pagination: Pagination = {
                page: params.page,
                limit: params.limit
            };
            console.log('params.filters:', params.filters);
            
            const queries = params.filters ? convertFiltersToQueries(params.filters) : [];

            const response = await api.get("/user/table", {
                params: {
                    pagination: JSON.stringify(pagination),
                    ...(queries.length > 0 && { queries: JSON.stringify(queries) }),
                    ordering: JSON.stringify({ createdAt: "desc" })
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getUser = async (id: number): Promise<IUserResponse> => {
        try {
            setLoading(true);
            const response = await api.get(`/user/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (data: ICreateUserRequest): Promise<IUserResponse> => {
        try {
            setLoading(true);
            const response = await api.post("/user", data);
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (id: number, data: IUpdateUserRequest): Promise<IUserResponse> => {
        try {
            setLoading(true);
            const response = await api.patch(`/user/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        getUsers,
        getUser,
        createUser,
        updateUser,
        loading
    };
}; 