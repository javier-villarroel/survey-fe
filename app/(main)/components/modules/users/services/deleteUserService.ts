import { AxiosError } from "axios";
import { toast } from "sonner";
import apiWithAuth from "@/app/api/axios";
import { BaseResponse } from "@/app/(main)/components/common/lib/response";
import { USER_API_BASE } from "./constants";

export const deleteUserService = async (id: number | string): Promise<boolean> => {
  try {
    const { data } = await apiWithAuth.delete<BaseResponse<null>>(`${USER_API_BASE}/${id}`);
    toast.success(data.info.message_to_show || "Usuario eliminado exitosamente");
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.info?.message_to_show || "Error al eliminar usuario");
    }
    return false;
  }
}; 