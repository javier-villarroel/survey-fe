import { AxiosError } from "axios";
import { toast } from "sonner";
import apiWithAuth from "@/app/api/axios";
import { IUsersListResponse } from "./types";
import { USER_API_BASE } from "./constants";

export const getUsersService = async (params?: { page?: number; limit?: number; search?: string }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);

    const { data } = await apiWithAuth.get<IUsersListResponse>(
      `${USER_API_BASE}/table?${queryParams.toString()}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.info?.message_to_show || "Error al obtener usuarios");
    }
    throw error;
  }
}; 