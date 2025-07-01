import { AxiosError } from "axios";
import { IUser, ICreateUserRequest, IUserResponse } from "./types";
import { noAuthApi } from "@/app/api/axios";

export const createUserService = async (userData: ICreateUserRequest): Promise<IUser | null> => {
  try {
    const { phonePrefix, phoneNumber, ...rest } = userData;
    const phone = phonePrefix && phoneNumber ? `${phonePrefix}${phoneNumber}` : undefined;

    const { data } = await noAuthApi.post<IUserResponse>("/user", {
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