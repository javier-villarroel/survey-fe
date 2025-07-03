import { TablePaginationParams } from "@/app/(main)/components/common/components/table/types";
import { DataTableStateEvent } from "primereact/datatable";
import { IUsersListResponse } from "../services/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUsers } from "./useUsers";
import { useState, useEffect } from "react";

interface TableParams {
    page: number;
    limit: number;
}

const initialPagination: TableParams = {
    page: 1,
    limit: 10
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

    const { data, isLoading, error } = useQuery<IUsersListResponse>({
        queryKey: ["users", queryParams],
        queryFn: () => getUsers({
            page: queryParams.page,
            limit: queryParams.limit
        }),
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
            limit: event.rows ?? initialPagination.limit
        });
    };

    const handleFilter = (params: TableParams) => {
        setQueryParams({
            page: params.page,
            limit: params.limit
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