import { TablePaginationParams } from "@/app/(main)/components/common/components/table/types";
import { DataTableStateEvent } from "primereact/datatable";
import { IUsersListResponse } from "../services/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUsers } from "./useUsers";
import { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";

interface TableParams {
    page: number;
    limit: number;
    filters?: Record<string, any>;
}

interface QueryFilter {
    field: string;
    text: string;
}

const initialPagination: TableParams = {
    page: 1,
    limit: 10,
    filters: {}
};

const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

export const useUsersTable = () => {
    const [queryParams, setQueryParams] = useState<TableParams>(initialPagination);
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
    const { getUsers } = useUsers();
    const queryClient = useQueryClient();

    useEffect(() => {
        const email = getCookie('email');
        if (email) {
            setCurrentUserEmail(decodeURIComponent(email));
        }
    }, []);

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

    const { data, isLoading, error } = useQuery<IUsersListResponse>({
        queryKey: ["users", queryParams],
        queryFn: async () => {
            const queries = queryParams.filters ? convertFiltersToQueries(queryParams.filters) : [];
            
            const params = {
                pagination: JSON.stringify({
                    page: queryParams.page,
                    limit: queryParams.limit
                }),
                ...(queries.length > 0 && { queries: JSON.stringify(queries) }),
                ordering: JSON.stringify({ createdAt: "desc" })
            };

            return getUsers({
                page: queryParams.page,
                limit: queryParams.limit,
                filters: queryParams.filters
            });
        },
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        select: (data) => {
            if (!data || !currentUserEmail) return data;
            
            const filteredUsers = data.result.filter(user => user.email !== currentUserEmail);
            return {
                ...data,
                result: filteredUsers,
                pagination: {
                    ...data.pagination,
                    count: filteredUsers.length
                }
            };
        }
    });

    const refreshData = () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
    };

    const onTableChange = (event: DataTableStateEvent) => {
        setQueryParams({
            page: (event.page ?? 0) + 1,
            limit: event.rows ?? initialPagination.limit,
            filters: event.filters || {}
        });
    };

    const handleFilter = (params: TableParams) => {
        setQueryParams({
            page: params.page,
            limit: params.limit,
            filters: params.filters
        });
    };

    const transformedPagination = data?.pagination ? {
        currentPage: data.pagination.page - 1,
        totalPages: Math.ceil(data.pagination.count / data.pagination.perPage),
        totalDocs: data.pagination.count,
        rowsPerPage: data.pagination.perPage,
        first: (data.pagination.page - 1) * data.pagination.perPage,
        hasNextPage: data.pagination.hasNextPage,
        hasPrevPage: data.pagination.hasPrevPage
    } : undefined;

    return {
        data: data?.result || [],
        pagination: transformedPagination,
        loading: isLoading,
        error,
        onTableChange,
        handleFilter,
        refreshData
    };
}; 