import { z } from "zod";

import { COMMON_VALIDATORS } from "../../common.validators";
import { ModuleEnum } from "../../enum";

const { nativeEnum, object } = z;
const { STRING, NUMBER } = COMMON_VALIDATORS;

export enum EProcessActions {
	SUSPEND = "SUSPEND",
	CREATE = "CREATE",
	UPDATE = "UPDATE",
	DETAIL = "DETAIL",
	LIST = "LIST",
	CLOSE = "CLOSE",
	TO_CLOSE = "TO_CLOSE",
	RECEIVE_DISPATCH = "RECEIVE_DISPATCH",
}

export enum EStatusNames {
	INACTIVE = "Inactivo",
	ACTIVE = "Activo",
}

export const processActionsEnumSchema = nativeEnum(EProcessActions);
export const statusNamesEnumSchema = nativeEnum(EStatusNames);

export const processSchema = object({
	name: processActionsEnumSchema,
	module: nativeEnum(ModuleEnum),
	id: NUMBER,
});

export const roleProcessSchema = object({
	status: object({ id: NUMBER, name: statusNamesEnumSchema }),
	process: processSchema,
	processId: NUMBER,
});

export const roleSchema = object({
	id: NUMBER,
	name: STRING,
	roleProcess: roleProcessSchema.array(),
});

export type IFormattedPermissions = {
	[key in ModuleEnum]: {
		[key in EProcessActions]: boolean;
	};
};

export type IFirstAbleModuleAction = {
	[module in ModuleEnum]: EProcessActions;
};

export interface IRoleProcess extends z.infer<typeof roleProcessSchema> {}
export interface IProcess extends z.infer<typeof processSchema> {}
export interface IRole extends z.infer<typeof roleSchema> {}
