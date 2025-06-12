import { ModuleEnum } from "../(main)/components/common/lib/enum";

export const ModuleRoutesEquivalents = {
	//--- Mains
	[ModuleEnum.DASHBOARD]: { route: "/inicio", label: "Inicio" },
	[ModuleEnum.USER]: { route: "/usuarios", label: "Usuarios" },
	[ModuleEnum.QUESTIONS]: { route: "/cuestionarios", label: "Cuestionarios" },

	[ModuleEnum.CONSIGNEE]: {
		route: "/ajustes/consignatarios",
		label: "Conceptos",
	},
	[ModuleEnum.ROLE]: { route: "/ajustes/roles", label: "Roles" },
};
