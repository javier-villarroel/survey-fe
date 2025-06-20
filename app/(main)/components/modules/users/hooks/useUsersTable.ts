import { TablePaginationParams } from "@/app/(main)/components/common/components/table/types";
import { DataTableStateEvent } from "primereact/datatable";
import { IUsersListResponse } from "../services/types";
import { useQuery } from "@tanstack/react-query";
import { useUsers } from "./useUsers";
import { useState } from "react";

interface TableParams extends TablePaginationParams {
    filters?: Record<string, any>;
    search?: string;
}

const initialPagination: TablePaginationParams = {
    page: 1,
    limit: 10
};

export const useUsersTable = () => {
    const [queryParams, setQueryParams] = useState<TableParams>({ 
        ...initialPagination,
        search: "",
        filters: {}
    });
    const { getUsers } = useUsers();

    const { data, isLoading, error } = useQuery<IUsersListResponse>({
        queryKey: ["users", queryParams],
        queryFn: () => getUsers({
            page: queryParams.page,
            limit: queryParams.limit,
            search: queryParams.search
        }),
        staleTime: 0, // Siempre considerar los datos como obsoletos
        refetchOnMount: true, // Refetch al montar el componente
        refetchOnWindowFocus: true // Refetch cuando la ventana recupera el foco
    });

    const onTableChange = (event: DataTableStateEvent) => {
        setQueryParams(prev => ({
            ...prev,
            page: (event.page ?? 0) + 1,
            limit: event.rows ?? prev.limit
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
        handleFilter
    };
}; 