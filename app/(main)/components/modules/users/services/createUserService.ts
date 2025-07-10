import { AxiosError } from "axios";
import { IUser, ICreateUserRequest, IUserResponse } from "./types";
import apiWithAuth from "@/app/api/axios";
import { USER_API_BASE } from "./constants";

export const createUserService = async (userData: ICreateUserRequest): Promise<IUser | null> => {
  try {
    const { phonePrefix, phoneNumber, ...rest } = userData;
    const phone = phonePrefix && phoneNumber ? `${phonePrefix}${phoneNumber}` : undefined;

    const { data } = await apiWithAuth.post<IUserResponse>(`${USER_API_BASE}`, {
      ...rest,
      phone
    });
    
    return data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.info?.message_to_show || "Error al crear usuario");
    }
    throw error;
  }
}; 