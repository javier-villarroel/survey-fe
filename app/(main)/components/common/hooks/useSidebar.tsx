import { useRouter } from "next/navigation";
import { removeCookie } from "typescript-cookie";

export const useSideBar = () => {
	const { push } = useRouter();
	const logout = async () => {
		removeCookie("accessToken");
		removeCookie("refreshToken");
		await push("/auth");
	};
	return {
		logout,
	};
};
