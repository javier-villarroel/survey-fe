import { AxiosError } from "axios";
import { IUsersListResponse } from "./types";
import apiWithAuth from "@/app/api/axios";
import { USER_API_BASE } from "./constants";

interface Pagination {
    page: number;
    limit: number;
}

interface QueryFilter {
    field: string;
    text: string;
}

interface GetUsersParams {
    page: number;
    limit: number;
    filters?: Record<string, any>;
}

const convertFiltersToQueries = (filters: Record<string, any>): QueryFilter[] => {
    const queries: QueryFilter[] = [];

    if (!filters) return queries;

    Object.entries(filters).forEach(([field, filterData]) => {
        if (!filterData) return;

        let value: string | null = null;

        if (typeof filterData === 'string') {
            value = filterData;
        } else if (filterData.value) {
            value = filterData.value;
        } else if (filterData.constraints?.[0]?.value) {
            value = filterData.constraints[0].value;
        }

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

export const getUsersService = async ({ page, limit, filters }: GetUsersParams): Promise<IUsersListResponse> => {
    try {
        const pagination: Pagination = { page, limit };
        const queries = convertFiltersToQueries(filters || {});

        const { data } = await apiWithAuth.get<IUsersListResponse>(`${USER_API_BASE}/table`, {
            params: {
                pagination: JSON.stringify(pagination),
                ...(queries.length > 0 && { queries: JSON.stringify(queries) }),
                ordering: JSON.stringify({ createdAt: "desc" })
            }
        });

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.info?.message_to_show || "Error al obtener los usuarios");
        }
        throw error;
    }
}; 