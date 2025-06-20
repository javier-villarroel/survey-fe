// import { IFormattedPermissions, IRole } from "@/components/common/lib/permissions/schemas";
// import { RouteLink } from "@/components/common/components/sidebar/types";

import { IRole } from "@/app/(main)/components/common/lib/permissions/schemas";

export enum AUTH_CODES {
	RTE001 = "RTE001", // refresh token expired
}

export type IRecovery = {
	email: string;
};

export type Token = {
	passToken: string;
	userId?: string;
	token: string;
};

export type ChangePassword = {
	confirmPassword?: string;
	password: string;
	userId: string;
};

export interface IUserAlmacenadora {
	id: number;
	userId: number;
	almacenadoraId: number;
}

export interface IUserPort {
	id: number;
	userId: number;
	portId: number;
}

export interface IUserHeadquarter {
	id: number;
	userId: number;
	headquarterId: number;
}

export interface UserLogin {
	// permissions: IFormattedPermissions;
	// sidebarAbleModules?: RouteLink[];
	refreshToken: string;
	accessToken: string;
	userName: string;
	lastName: string;
	name: string;
	role: IRole;

	userAlmacenadora: IUserAlmacenadora[];
	userHeadquarter: IUserHeadquarter[];
	userPort: IUserPort[];
}
