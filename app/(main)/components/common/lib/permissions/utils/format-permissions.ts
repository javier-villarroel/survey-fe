import { parseStatusToBoolean } from "../../parse-status-to-boolean";
import { IFormattedPermissions, IRole } from "../schemas";

export const formatPermissionsForAuth = (role: IRole): IFormattedPermissions =>
	role.roleProcess?.reduce((acc, roleProcess) => {
		const {
			process: { module, name: processAction },
			status: { name: statusName },
		} = roleProcess;

		acc[module] = acc[module] || ({} as IFormattedPermissions[typeof module]);
		acc[module][processAction] = parseStatusToBoolean(statusName);

		return acc;
	}, {} as IFormattedPermissions);
