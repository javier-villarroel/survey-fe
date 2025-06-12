// import { IDispatchSideButton } from "@/components/common/layouts/dispatchlayout";
// import { UserLogin } from "@/components/modules/auth/lib/auth";
// import { ModuleEnum } from "../../enum";

// interface IParams {
//   modulesAllowed: ModuleEnum[];
//   userAuth: UserLogin;
// }

// export const evaluateAllowedDispatchBtns = (params: IParams): boolean => {
//   const {
//     modulesAllowed,
//     userAuth: { userPort, userAlmacenadora, userHeadquarter },
//   } = params;
//   let isAllowed = true;

//   return isAllowed;
// };

// export const mapAllowedDispatchBtns = (
//   sideDispatchBtns: IDispatchSideButton[],
//   userAuth: UserLogin,
// ): IDispatchSideButton[] => {
//   return sideDispatchBtns?.map((sideBtn) => ({
//     ...sideBtn,
//     isAllowed: evaluateAllowedDispatchBtns({
//       userAuth,
//       modulesAllowed: sideBtn.modulesAllowed,
//     }),
//   }));
// };
