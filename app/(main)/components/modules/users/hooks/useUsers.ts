import { useState, useCallback } from "react";
import { useApi } from "@/app/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";
import { IUser, ICreateUserRequest, IUpdateUserRequest, IUsersListResponse, IUserResponse } from "../services/types";
import { TablePaginationParams } from "@/app/(main)/components/common/components/table/types";

interface PaginationQueryParams {
    pagination: string;
    search?: string;
}

export const useUsers = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    const getUsers = async (params: TablePaginationParams): Promise<IUsersListResponse> => {
        try {
            setLoading(true);
            const paginationParams: PaginationQueryParams = {
                pagination: JSON.stringify({
                    page: params.page,
                    limit: params.limit
                })
            };

            if (params.search) {
                paginationParams.search = params.search;
            }

            const response = await api.get("/user/table", {
                params: paginationParams
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

    const deleteUser = useCallback(async (userId: number) => {
        try {
            setLoading(true);
            await api.delete(`/user/${userId}`);
            await queryClient.invalidateQueries({ queryKey: ["users"] });
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [api, queryClient]);

    const toggleUserStatus = useCallback(async (user: IUser) => {
        try {
            setLoading(true);
            await api.patch(`/user/${user.id}`, {
                status: !user.status
            });
            await queryClient.invalidateQueries({ queryKey: ["users"] });
        } catch (error) {
            console.error("Error toggling user status:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [api, queryClient]);

    return {
        getUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
        loading
    };
}; 