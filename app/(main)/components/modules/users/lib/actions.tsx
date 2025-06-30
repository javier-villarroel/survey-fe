import React from "react";
import { Button } from "primereact/button";
import { addUserRoleService, changeUserStatusService } from "../services/users.services";
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
			const response = await addUserRoleService(row.id);
			if (response.success) {
				toast.success(response.message);
				if (onActionComplete) onActionComplete();
			} else {
				toast.error(response.error || 'Error al asignar el rol de administrador');
			}
		} catch (error) {
			console.error('Error en handleAssignRole:', error);
			toast.error('Error al asignar el rol de administrador');
		}
	};

	const handleChangeStatus = async (newStatus: 'ACTIVE' | 'BLOQUED') => {
		try {
			const response = await changeUserStatusService(row.id, newStatus);
			if (response.success) {
				toast.success(response.message);
				if (onActionComplete) onActionComplete();
			} else {
				toast.error(response.error || `Error al ${newStatus === 'ACTIVE' ? 'activar' : 'bloquear'} el usuario`);
			}
		} catch (error) {
			console.error('Error en handleChangeStatus:', error);
			toast.error(`Error al ${newStatus === 'ACTIVE' ? 'activar' : 'bloquear'} el usuario`);
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
			{row.status === 'ACTIVE' ? (
				<Button
					type="button"
					label="Suspender"
					icon="pi pi-ban"
					severity="danger"
					onClick={() => handleChangeStatus('BLOQUED')}
				/>
			) : (
				<Button
					type="button"
					label="Activar"
					icon="pi pi-check"
					severity="success"
					onClick={() => handleChangeStatus('ACTIVE')}
				/>
			)}
		</div>
	);
};

export default ActionDropdown;
