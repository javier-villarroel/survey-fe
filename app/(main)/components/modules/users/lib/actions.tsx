import React from "react";
import { Button } from "primereact/button";
import { addUserAccessService } from "../services/addUserAccessService";
import { UserRoles, UserStatus } from "../lib/enums";
import { toast } from "sonner";
import { useChangeUserStatus } from "../hooks/useChangeUserStatus";

interface ActionDropdownProps {
	row: {
		id: number;
		status: string;
	};
	onActionComplete?: () => void;
}

const ActionDropdown = ({ row, onActionComplete }: ActionDropdownProps) => {
	const { changeUserStatus, toast: statusToast } = useChangeUserStatus();

	const handleAssignRole = async () => {
		try {
			const result = await addUserAccessService(row.id, UserRoles.ADMIN);
			if (result) {
				toast.success("Rol de administrador asignado correctamente");
				if (onActionComplete) onActionComplete();
			}
		} catch (error) {
			console.error('Error en handleAssignRole:', error);
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('Error al asignar el rol de administrador');
			}
		}
	};

	const handleChangeStatus = async (newStatus: UserStatus) => {
		changeUserStatus(row.id, newStatus);
		if (onActionComplete) onActionComplete();
	};

	return (
		<div className="flex gap-2">
			<Button
				type="button"
				label="Asignar admin"
				icon="pi pi-users"
				severity="help"
				onClick={handleAssignRole}
			/>
			{row.status === UserStatus.ACTIVE ? (
				<Button
					type="button"
					label="Suspender"
					icon="pi pi-ban"
					severity="danger"
					onClick={() => handleChangeStatus(UserStatus.SUSPENDED)}
				/>
			) : row.status === UserStatus.SUSPENDED ? (
				<Button
					type="button"
					label="Activar"
					icon="pi pi-check"
					severity="success"
					onClick={() => handleChangeStatus(UserStatus.ACTIVE)}
				/>
			) : null}
			{row.status !== UserStatus.DELETED && (
				<Button
					type="button"
					label="Eliminar"
					icon="pi pi-trash"
					severity="danger"
					onClick={() => handleChangeStatus(UserStatus.DELETED)}
				/>
			)}
		</div>
	);
};

export default ActionDropdown;
