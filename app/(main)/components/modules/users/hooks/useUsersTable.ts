import { TablePaginationParams } from "@/app/(main)/components/common/components/table/types";
import { DataTableStateEvent } from "primereact/datatable";
import { IUsersListResponse } from "../services/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUsers } from "./useUsers";
import { useState, useEffect } from "react";

interface TableParams extends TablePaginationParams {
    filters?: Record<string, any>;
    search?: string;
}

const initialPagination: TablePaginationParams = {
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
    const [queryParams, setQueryParams] = useState<TableParams>({ 
        ...initialPagination,
        search: "",
        filters: {}
    });
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
            limit: queryParams.limit,
            search: queryParams.search,
            filters: queryParams.filters
        }),
        staleTime: 0, // Siempre considerar los datos como obsoletos
        refetchOnMount: true, // Refetch al montar el componente
        refetchOnWindowFocus: true, // Refetch cuando la ventana recupera el foco
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
        const newFilters = event.filters || {};
        
        setQueryParams(prev => ({
            ...prev,
            page: (event.page ?? 0) + 1,
            limit: event.rows ?? prev.limit,
            filters: newFilters,
            search: event.globalFilter as string || ""
        }));
    };

    const handleFilter = (params: TablePaginationParams) => {
        setQueryParams(prev => ({
            ...prev,
            page: params.page,
            limit: params.limit,
            search: params.search,
            filters: params.filters
        }));
    };

    // Transformamos la paginación para que coincida con lo que espera PrimeReact
    const transformedPagination = data?.pagination ? {
        currentPage: data.pagination.page - 1, // PrimeReact espera páginas basadas en 0
        totalPages: Math.ceil(data.pagination.count / data.pagination.perPage), // Calculamos el total de páginas basado en el total de registros
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