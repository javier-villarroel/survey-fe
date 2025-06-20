import { getCookie } from "typescript-cookie";
import axios from "axios";
import { refreshSession } from "../(main)/components/common/services/Services/refresh-session";

//--- API WITHOUT AUTH
export const noAuthApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3080/v1/",
});

//--- API WITH AUTH
const apiWithAuth = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1/",
});

// Interceptor for handling 401 errors
apiWithAuth.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const newToken = await refreshSession();
				if (newToken) {
					// Refresh the token in the header and retry the original request
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
					return apiWithAuth(originalRequest);
				}
			} catch (refreshError) {
				console.log("Failed to refresh token:", refreshError);
				// If the refresh fails, maybe want to redirect the user to the login page
				throw refreshError;
			}
		}

		return Promise.reject(error);
	},
);

// Interceptor for adding the token to outgoing requests
apiWithAuth.interceptors.request.use((config) => {
	const accessToken = getCookie("accessToken");

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

export default apiWithAuth;
