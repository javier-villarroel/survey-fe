import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

const ActionDropdown = ({ row }: { row: any }) => {
	const menuRef = useRef<any>(null);

	const items = [
		{
			label: "Editar",
			icon: "pi pi-pencil",
			command: () => {
				console.log("Editar", row);
			},
		},
		{
			label: "Eliminar",
			icon: "pi pi-trash",
			command: () => {
				console.log("Eliminar", row);
			},
		},
		{
			label: "Asignar rol admin",
			icon: "pi pi-user-plus",
			command: () => {
				console.log("Asignar rol admin", row);
			},
		},
	];

	return (
		<div>
			<Button
				icon="pi pi-ellipsis-v"
				className="p-button-text p-button-sm"
				onClick={(e) => menuRef.current.toggle(e)}
			/>
			<Menu model={items} popup ref={menuRef} />
		</div>
	);
};

export default ActionDropdown;
