import { AxiosError } from "axios";
import { toast } from "sonner";
import apiWithAuth from "@/app/api/axios";
import { IUser, IUserResponse } from "./types";
import { USER_API_BASE } from "./constants";

export const getUserByIdService = async (id: number | string): Promise<IUser | null> => {
  try {
    const { data } = await apiWithAuth.get<IUserResponse>(`user/${id}/view?include={"groups":{"include":{"role":true}}}`);
    return data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.info?.message_to_show || "Error al obtener usuario");
    }
    return null;
  }
}; 