import { AxiosError } from "axios";
import { IUser, IUserResponse } from "./types";
import { UserStatus } from "../lib/enums";
import apiWithAuth from "@/app/api/axios";
import { USER_API_BASE } from "./constants";

export const changeUserStatusService = async (userId: number, status: UserStatus): Promise<IUser | null> => {
  try {
    const { data } = await apiWithAuth.patch<IUserResponse>(`${USER_API_BASE}/${userId}/change_status`, { status });
    return data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.info?.message_to_show || "Error al cambiar el estado del usuario");
    }
    throw error;
  }
}; 