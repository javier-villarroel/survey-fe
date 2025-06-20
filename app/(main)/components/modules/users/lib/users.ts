// import { UUID } from "crypto";
// import { CommonStatus } from "../../../common/lib/common-status";

// export interface IUser {
// 	id: string;
// 	idSequence: number;
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	userName: string;
// 	phoneCode: string;
// 	numberPhone: string;
// 	pidType: string;
// 	roleId: string;
// 	statusId: string;
// 	almacenadoraId?: number;
// 	headquarterId?: number;
// 	portId?: number;
// 	wharehouses?: string[];
// 	userData: UUID;
// 	lastLogin?: Date;
// 	ip?: string;
// 	pid: string;
// 	role: IRole;
// 	selfiePicture?: { id: number; url: string }[];
// 	ciPicture?: { id: number; url: string }[];
// 	foodHandling?: string;
// 	healthCertificate?: string;
// 	ci: string;
// 	session?: string;
// 	refreshToken?: string;
// 	headquarterIdList?: number[];
// 	almacenadoraIdList?: number[];
// 	portIdList?: number[];
// 	userAlmacenadora?: IUserIdList[];
// 	userPort?: IUserIdList[];
// 	userHeadquarter?: IUserIdList[];
// }

// export interface IRole {
// 	name: string;
// 	createdAt: string;
// 	role: string;
// 	updatedAt: string;
// 	__v: number;
// 	id: string;
// }
// export interface IStatus {
// 	id: string;
// 	name: string;
// }

// export interface IUserIdList {
// 	id: number;
// 	userId: number;
// 	almacenadoraId: number;
// 	portId: number;
// 	headquarterId: number;
// }

// type UserStatus = CommonStatus | "BLOCKED";

// export const UserStatus = { ...CommonStatus, BLOCKED: "BLOCKED" };

// export const Status: Record<CommonStatus, string> = {
// 	[CommonStatus.ACTIVE]: "Activo",
// 	[CommonStatus.INACTIVE]: "Inactivo",
// 	// [CommonStatus.SUSPENDED]: "Suspendido",
// };

// export const UserStatusEs: Record<UserStatus, string> = {
// 	...Status,
// 	BLOCKED: "Bloqueado",
// };

// export const ColorStatusUser = {
// 	[UserStatus.ACTIVE]: "border-green-500 bg-[#ECFDF3]  text-green-500",
// 	[UserStatus.BLOCKED]: "border-red-500 bg-[#FFF0F0]  text-red-500",
// 	[UserStatus.INACTIVE]: "border-red-500 bg-[#FFF0F0]  text-red-500",
// 	// [UserStatus.SUSPENDED]: "border-red-500 bg-[#FFF0F0]  text-red-500",
// };
