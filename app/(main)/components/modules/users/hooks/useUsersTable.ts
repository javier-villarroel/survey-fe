import { IUsersListResponse } from "../services/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUsersService } from "../services/getUsersService";

interface UserFilters {
    firstName?: string;
    lastName?: string;
    email?: string;
    'role.name'?: string;
    status?: string;
}

export interface TableParams {
    page: number;
    limit: number;
    filters: UserFilters;
}

const initialPagination: TableParams = {
    page: 1,
    limit: 5,
    filters: {} as UserFilters
};

const formatFilters = (filters: Record<string, any>) => {
    const formattedFilters: Record<string, any> = {};
    
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '') {
            if (key === 'role.name') {
                if (value === 'NO_ROLE') {
                    formattedFilters['role'] = null;
                } else {
                    formattedFilters['role.name'] = value;
                }
            } else {
                formattedFilters[key] = value;
            }
        }
    });

    return formattedFilters;
};

export const useUsersTable = () => {
    const [queryParams, setQueryParams] = useState<TableParams>(initialPagination);
    const queryClient = useQueryClient();

    const { data, isLoading: loading, error } = useQuery<IUsersListResponse>({
        queryKey: ["users", queryParams],
        queryFn: async () => {
            const formattedFilters = formatFilters(queryParams.filters || {});
            const response = await getUsersService({
                page: queryParams.page,
                limit: queryParams.limit,
                filters: formattedFilters
            });

            return response;
        },
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        select: (data) => {
            if (!data) return data;
            
            return {
                ...data,
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
        loading,
        error,
        handleFilter,
        refreshData
    };
}; 