import { useRouter } from "next/navigation";
import { removeCookie } from "typescript-cookie";
import NProgress from "nprogress";
import "@/app/styles/nprogress.scss";

export const useSideBar = () => {
	const { push } = useRouter();
	const logout = async () => {
		try {
			NProgress.configure({ showSpinner: false });
			NProgress.start();
			removeCookie("accessToken");
			removeCookie("refreshToken");
			removeCookie("email");
			removeCookie("userId");
			await push("/auth/login");
		} finally {
			NProgress.done();
		}
	};
	return {
		logout,
	};
};
