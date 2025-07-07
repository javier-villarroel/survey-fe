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
    const [filters, setFilters] = useState<Record<string, any>>({});

    const convertFiltersToQueries = (filters: Record<string, any>): QueryFilter[] => {
        const queries: QueryFilter[] = [];

        if (!filters) return queries;

        // Procesar cada campo de filtro
        Object.entries(filters).forEach(([field, filterData]) => {
            // Ignorar campos vacíos o nulos
            if (!filterData) return;

            let value: string | null = null;

            // Manejar diferentes estructuras de filtro
            if (typeof filterData === 'string') {
                // Si es un string directo
                value = filterData;
            } else if (filterData.value) {
                // Si tiene una propiedad value directa
                value = filterData.value;
            } else if (filterData.constraints?.[0]?.value) {
                // Si usa la estructura de constraints de PrimeReact
                value = filterData.constraints[0].value;
            }

            // Solo agregar si hay un valor
            if (value) {
                const actualField = field.includes('.') ? field.split('.').pop()! : field;
                queries.push({
                    field: actualField,
                    text: value
                });
            }
        });

        return queries;
    };

    const handleFilterChange = (field: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [field]: { value }
        }));
    };

    const getUsers = async (params: TablePaginationParams): Promise<IUsersListResponse> => {
        try {
            setLoading(true);

            const pagination: Pagination = {
                page: params.page,
                limit: params.limit
            };

            // Combinar filtros del estado con los recibidos
            const allFilters = {
                ...filters,
                ...(params.filters || {})
            };

            const queries = convertFiltersToQueries(allFilters);
            console.log('Filtros aplicados:', allFilters);
            console.log('Queries generadas:', queries);

            const response = await api.get("/user/table", {
                params: {
                    pagination: JSON.stringify(pagination),
                    ...(queries.length > 0 && { queries: JSON.stringify(queries) }),
                    ordering: JSON.stringify({ createdAt: "asc" })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error en getUsers:', error);
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
        loading,
        handleFilterChange,
        filters
    };
}; 