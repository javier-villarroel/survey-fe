import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TablePaginationParams } from "@/app/(main)/components/common/components/table/types";
import { projectsService } from "../services/projectsService";
import { ProjectsListResponse } from "../services/types";
import { DataTableStateEvent } from "primereact/datatable";

interface TableParams {
    page: number;
    limit: number;
    search?: string;
    filters?: Record<string, any>;
}

const initialPagination: TableParams = {
    page: 1,
    limit: 10,
    search: "",
    filters: {}
};

export const useProjectsTable = () => {
    const [queryParams, setQueryParams] = useState<TableParams>(initialPagination);

    const { data, isLoading, error } = useQuery<ProjectsListResponse>({
        queryKey: ["projects", queryParams],
        queryFn: () => projectsService.getProjects({
            page: queryParams.page,
            limit: queryParams.limit,
            search: queryParams.search
        }),
        staleTime: 5 * 60 * 1000, // 5 minutos
    });

    const onTableChange = (event: DataTableStateEvent) => {
        if (event.page !== undefined && event.rows !== undefined) {
            // Capture the values outside the callback to preserve type narrowing
            const page = event.page;
            const rows = event.rows;
            
            setQueryParams(prev => ({
                ...prev,
                page: page + 1,
                limit: rows
            }));
        }
    };

    const handleFilter = (params: TablePaginationParams) => {
        setQueryParams(prev => ({
            ...prev,
            page: params.page || 1,
            limit: params.limit,
            search: params.search,
            filters: params.filters
        }));
    };

    return {
        data: data?.result || [],
        pagination: data?.pagination ? {
            totalDocs: data.pagination.count,
            page: data.pagination.page,
            perPage: data.pagination.perPage,
            hasNextPage: data.pagination.hasNextPage,
            hasPrevPage: data.pagination.hasPrevPage
        } : undefined,
        loading: isLoading,
        error,
        onTableChange,
        handleFilter
    };
}; 