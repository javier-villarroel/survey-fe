import { ModuleEnum } from "../../enum";
import { UserLogin } from "@/app/(full-page)/auth/lib/auth";

interface IParams {
	modulesAllowed: ModuleEnum[];
	userAuth: UserLogin;
}

export const evaluateAllowedDispatchBtns = (params: IParams): boolean => {
	const {
		modulesAllowed,
		userAuth: { userPort, userAlmacenadora, userHeadquarter },
	} = params;
	let isAllowed = true;

	return isAllowed;
};

export const mapAllowedDispatchBtns = (
	sideDispatchBtns: any[],
	userAuth: UserLogin,
): any[] => {
	return sideDispatchBtns?.map((sideBtn) => ({
		...sideBtn,
		isAllowed: evaluateAllowedDispatchBtns({
			userAuth,
			modulesAllowed: sideBtn.modulesAllowed,
		}),
	}));
};
