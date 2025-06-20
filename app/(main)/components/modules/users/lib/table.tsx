import ActionDropdown from "./actions";

export const columns = [
	{ field: "id", header: "id", filter: true, style: { minWidth: "10rem" } },
	{
		field: "fullName",
		header: "Nombre",
		filter: true,
		style: { minWidth: "10rem" },
	},
	{
		field: "email",
		header: "Email",
		filter: true,
		style: { minWidth: "16rem" },
	},
	{
		field: "phones",
		header: "Teléfonos",
		body: (row: any) => row.phones?.join(", "),
		style: { minWidth: "12rem" },
	},
	{ field: "status", header: "Estado", style: { minWidth: "8rem" } },
	{
		field: "twoFactorAuth",
		header: "2FA",
		body: (row: any) => (row.twoFactorAuth ? "Sí" : "No"),
		style: { minWidth: "6rem" },
	},
	{
		field: "acciones",
		header: "Acciones",
		body: (row: any) => <ActionDropdown row={row} />,
		style: { minWidth: "8rem" },
		exportable: false,
		filter: false,
		sortable: false,
	},
];
