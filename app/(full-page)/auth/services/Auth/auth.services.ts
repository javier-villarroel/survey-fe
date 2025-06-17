import { AxiosError } from "axios";
import { CreateUserForm, FormLogin, IFormRecoverPassword } from "../../lib/schemas";
import { BaseResponse } from "@/app/(main)/components/common/lib/response";
import { noAuthApi } from "@/app/api/axios";
import { UserLogin } from "../../lib/auth";

export interface IResetPasswordResponse {
	otp: {
		id: number;
		token: string;
		expirationTime: string;
	};
	passToken: string;
	userId: number;
}

export interface IVerifyOTPRequest {
	passToken: string;
	code: string;
}

export interface IVerifySignInOTPRequest {
	passToken: string;
	code: string;
	event: string;
}

export interface IResetPasswordRequest {
	userId: number;
	passToken: string;
	newPassword: string;
}

export type ServiceResponse<T> = BaseResponse<T> | { error: string };

export const signInServices = async (credentials: FormLogin): Promise<ServiceResponse<UserLogin>> => {
	try {
		const { data } = await noAuthApi.post<BaseResponse<UserLogin>>(
			"/auth/login",
			credentials,
		);
		return data;
	} catch (error) {
		console.log('Error en signInServices:', error);
		
		if (error instanceof AxiosError) {
			return {
				error:
					error.response?.data?.info?.message_to_show ||
					"Error al iniciar sesión",
			};
		}
		throw error;
	}
};

export const recoverPasswordService = async (email: IFormRecoverPassword): Promise<ServiceResponse<IResetPasswordResponse>> => {
	try {
		const { data } = await noAuthApi.post<BaseResponse<IResetPasswordResponse>>(
			"/auth/reset_password",
			email
		);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				error:
					error.response?.data?.info?.message_to_show ||
					"Error al procesar la solicitud",
			};
		}
		throw error;
	}
};

export const verifyOTPService = async (verifyData: IVerifyOTPRequest): Promise<ServiceResponse<{ valid: boolean }>> => {
	
	try {
		console.log('verificando');
		const { data } = await noAuthApi.post<BaseResponse<{ valid: boolean }>>(
			"/otp/confirmation",
			{ "event": "OTP_RESET_PASSWORD",...verifyData}
		);
		
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				error:
					error.response?.data?.info?.message_to_show ||
					"Error assl verificar el código",
			};
		}
		throw error;
	}
};

export const verifySignInOTPService = async (verifyData: IVerifySignInOTPRequest): Promise<ServiceResponse<UserLogin>> => {
	try {
		const { data } = await noAuthApi.post<BaseResponse<UserLogin>>(
			"/otp/confirmation",
			verifyData
		);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				error:
					error.response?.data?.message ||
					"Error al verificar el código",
			};
		}
		throw error;
	}
};

export const resetPasswordService = async (resetData: IResetPasswordRequest): Promise<ServiceResponse<{ success: boolean }>> => {
	try {
		const { data } = await noAuthApi.post<BaseResponse<{ success: boolean }>>(
			"/auth/update_password",
			resetData
		);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				error:
					error.response?.data?.info?.message_to_show ||
					"Error al actualizar la contraseña",
			};
		}
		throw error;
	}
};

export const createUserService = async (userData: CreateUserForm): Promise<ServiceResponse<{ success: boolean }>> => {
	try {
		const { data } = await noAuthApi.post<BaseResponse<{ success: boolean }>>(
			"/user",
			userData
		);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				error:
					error.response?.data?.info?.message_to_show ||
					"Error al crear el usuario",
			};
		}
		throw error;
	}
};
