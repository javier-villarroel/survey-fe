// import { parseStatusToBoolean } from "../../parse-status-to-boolean";
// import { IFormattedPermissions, IRole } from "../schemas";

// export const formatPermissionsForAuth = (role: IRole): IFormattedPermissions =>
// 	role.roleProcess?.reduce((acc, roleProcess) => {
// 		const {
// 			process: { module, name: processAction },
// 			status: { name: statusName },
// 		} = roleProcess;

// 		acc[module] = acc[module] || ({} as IFormattedPermissions[typeof module]);
// 		acc[module][processAction] = parseStatusToBoolean(statusName);

// 		return acc;
// 	}, {} as IFormattedPermissions);

import { IFormattedPermissions, IRole } from "../schemas";

// Mock de parseStatusToBoolean sin jest
export const parseStatusToBoolean = (statusName: string): boolean => {
    // Puedes personalizar el mock según el statusName si lo necesitas
    return statusName === "Activo";
};

// Mock de formatPermissionsForAuth sin jest
export const formatPermissionsForAuth = (role: IRole): IFormattedPermissions => {
    // Retorna un objeto simulado de permisos para pruebas
    return {
        usuarios: { crear: true, editar: false, eliminar: true },
        encuestas: { ver: true, editar: true }
    } as any;
};