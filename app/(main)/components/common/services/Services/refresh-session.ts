import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { BaseResponse } from "../../lib/response";
import { ModuleEnum } from "../../lib/enum";
import { noAuthApi } from "@/app/api/axios";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (newToken: string) => {
	refreshSubscribers.forEach((callback) => callback(newToken));
	refreshSubscribers = [];
};

const addSubscriber = (callback: (token: string) => void) => {
	refreshSubscribers.push(callback);
};

export const refreshSession = async (): Promise<string | undefined> => {
	if (isRefreshing) {
		// If refreshing, returns a promise that resolves when the token is updated
		return new Promise((resolve) => {
			addSubscriber(resolve);
		});
	}

	// If not refreshing, refresh immediately
	isRefreshing = true;

	try {
		const { data } = await noAuthApi.get<BaseResponse<any>>(
			`${ModuleEnum.AUTH}/refresh`,
			{
				headers: {
					Authorization: `Bearer ${getCookie("refreshToken")}`,
				},
			},
		);

		const newAccessToken = data.result.accessToken;
		setCookie("accessToken", newAccessToken);

		const newRefreshToken = data.result.refreshToken;
		setCookie("refreshToken", newRefreshToken);

		onTokenRefreshed(newAccessToken);
		toast.success("Sesión actualizada");
		return newAccessToken;
	} catch (error) {
		if (error instanceof AxiosError && error.response?.status === 401) {
			toast.error("Su sesión ha expirado");
			removeCookie("accessToken");
			removeCookie("refreshToken");
			window.location.href = "/auth";
		}

		throw error;
	} finally {
		isRefreshing = false;
	}
};
