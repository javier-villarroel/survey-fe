// import { RouteLink } from "@/components/common/components/sidebar/types";
import { IFormattedPermissions } from "../schemas";

interface IParams {
	permissions: IFormattedPermissions;
	routes: any[];
}

export const formatAllowedSidebarModules = (params: IParams): any[] => {
	const { routes, permissions } = params;

	return routes
		.map((route) => {
			// Validate if the main module has valid permissions
			// Eliminar route?.allowed cuando vaya a subir
			let allowed = false;

			// if (permissions[route.module]) {
			// 	allowed = Object.values(permissions[route.module]).some(
			// 		(status) => status,
			// 	);
			// }

			// Process submodules recursively in case of exist
			let hasAllowedSublinks = false;
			if (route.sublinks) {
				route.sublinks = formatAllowedSidebarModules({
					routes: route.sublinks,
					permissions,
				});

				// Validate if some sublink has valid permissions
				// hasAllowedSublinks = route.sublinks.some((sublink) => sublink.allowed);
			}

			// Recalculate allowed and fatherAllowed
			const fatherAllowed = allowed || hasAllowedSublinks;

			return {
				...route,
				allowed,
				fatherAllowed,
			};
		})
		.filter((route) => route.fatherAllowed); // Filter father modules without permissions
};
