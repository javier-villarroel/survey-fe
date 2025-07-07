import { TablePaginationParams } from "@/app/(main)/components/common/components/table/types";
import { DataTableStateEvent } from "primereact/datatable";
import { IUsersListResponse } from "../services/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUsers } from "./useUsers";
import { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";

export interface TableParams {
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
    limit: 5,
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
            if (filter && filter.value !== undefined && filter.value !== '') {
                const actualField = field.includes('.') ? field.split('.').pop()! : field;
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
                ordering: JSON.stringify({ createdAt: "asc" })
            };

            const response = await getUsers({
                page: queryParams.page,
                limit: queryParams.limit,
                filters: queryParams.filters
            });

            return response;
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
                    totalDocs: data.pagination.count,
                    totalPages: data.pagination.totalPages,
                    perPage: data.pagination.limit,
                    page: data.pagination.page,
                    hasNextPage: data.pagination.hasNextPage,
                    hasPrevPage: data.pagination.hasPrevPage
                }
            };
        }
    });

    const refreshData = () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
    };

    const handleFilter = (params: TableParams) => {
        setQueryParams(params);
    };

    const transformedPagination = data?.pagination ? {
        currentPage: data.pagination.page,
        totalPages: data.pagination.totalPages,
        totalDocs: data.pagination.count,
        rowsPerPage: data.pagination.limit,
        first: (data.pagination.page - 1) * data.pagination.limit,
        hasNextPage: data.pagination.hasNextPage,
        hasPrevPage: data.pagination.hasPrevPage,
        page: data.pagination.page
    } : {
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0,
        rowsPerPage: initialPagination.limit,
        first: 0,
        hasNextPage: false,
        hasPrevPage: false,
        page: 1
    };

    return {
        data: data?.result || [],
        pagination: transformedPagination,
        loading: isLoading,
        error,
        handleFilter,
        refreshData
    };
}; 