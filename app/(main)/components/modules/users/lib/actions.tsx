import React from "react";
import { Button } from "primereact/button";
import { addUserAccessService } from "../services/addUserAccessService";
import { changeUserStatusService } from "../services/changeUserStatusService";
import { UserRoles, UserStatus } from "../lib/enums";
import { toast } from "sonner";

interface ActionDropdownProps {
	row: {
		id: number;
		status: string;
	};
	onActionComplete?: () => void;
}

const ActionDropdown = ({ row, onActionComplete }: ActionDropdownProps) => {
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
		try {
			const result = await changeUserStatusService(row.id, newStatus);
			if (result) {
				toast.success(`Usuario ${newStatus === UserStatus.ACTIVE ? 'activado' : 'bloqueado'} correctamente`);
				if (onActionComplete) onActionComplete();
			}
		} catch (error) {
			console.error('Error en handleChangeStatus:', error);
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error(`Error al ${newStatus === UserStatus.ACTIVE ? 'activar' : 'bloquear'} el usuario`);
			}
		}
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
					onClick={() => handleChangeStatus(UserStatus.BLOQUED)}
				/>
			) : (
				<Button
					type="button"
					label="Activar"
					icon="pi pi-check"
					severity="success"
					onClick={() => handleChangeStatus(UserStatus.ACTIVE)}
				/>
			)}
		</div>
	);
};

export default ActionDropdown;
