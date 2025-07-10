import { AxiosError } from "axios";
import { toast } from "sonner";
import apiWithAuth from "@/app/api/axios";
import { IUser, IUpdateUserRequest } from "./types";
import { USER_API_BASE } from "./constants";

export const updateUserService = async (
  id: number | string, 
  userData: IUpdateUserRequest
): Promise<IUser | null> => {
  try {
    const { data } = await apiWithAuth.patch<any>(`${USER_API_BASE}/${id}`, userData);
    toast.success(data.info.message_to_show || "Usuario actualizado exitosamente");
    return data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.info?.message_to_show || "Error al actualizar usuario");
    }
    return null;
  }
}; 