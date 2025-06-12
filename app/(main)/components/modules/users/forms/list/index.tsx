"use client";

import { DynamicTable } from "@/app/(main)/components/common/components/table/DynamicTable";
import { useUsersTable } from "../../hooks/useUsersTable";
import { confirmDialog } from 'primereact/confirmdialog';
import { createActions } from "./config/actions";
import { useUsers } from "../../hooks/useUsers";
import { IUser } from "../../services/types";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { columns } from "./config/columns";
import React, { useState } from "react";
import { Card } from "primereact/card";
import { CreateUser } from "../create";

const ListUsers = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
	const { deleteUser, toggleUserStatus } = useUsers();
	const { data, loading, pagination, onTableChange, handleFilter } = useUsersTable();



	const handleEdit = (user: IUser) => {
		setSelectedUser(user);
		setShowModal(true);
	};

	const handleDelete = async (userId: number) => {
		confirmDialog({
			message: '¿Está seguro que desea eliminar este usuario?',
			header: 'Confirmar eliminación',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Sí, eliminar',
			rejectLabel: 'No, cancelar',
			accept: () => deleteUser(userId)
		});
	};

	const handleToggleStatus = async (user: IUser) => {
		const action = user.status ? 'suspender' : 'activar';
		confirmDialog({
			message: `¿Está seguro que desea ${action} este usuario?`,
			header: `Confirmar ${action}`,
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: `Sí, ${action}`,
			rejectLabel: 'No, cancelar',
			accept: () => toggleUserStatus(user)
		});
	};

	const handleSuccess = () => {
		setShowModal(false);
		setSelectedUser(null);
	};

	const handleCancel = () => {
		setShowModal(false);
		setSelectedUser(null);
	};

	const actions = createActions({
		onEdit: handleEdit,
		onDelete: handleDelete,
		onToggleStatus: handleToggleStatus
	});

	const headerContent = (
		<div className="flex align-items-center gap-2">
			<i className={`pi ${selectedUser ? 'pi-user-edit' : 'pi-user-plus'} text-xl`}></i>
			<span className="font-medium text-xl">
				{selectedUser ? "Editar usuario" : "Crear usuario"}
			</span>
		</div>
	);

	return (
		<>
			<div className="relative w-full mb-4">
				<h2 className="text-2xl font-bold">Gestión de usuarios</h2>
				<div className="absolute right-0 top-0 -mt-1">
					<Button
						label="Crear usuario"
						icon="pi pi-user-plus"
						onClick={() => setShowModal(true)}
						style={{
							backgroundColor: '#2dabd2',
							borderColor: '#2dabd2'
						}}
					/>
				</div>
			</div>
			<Card className="w-full shadow-2">
				<Dialog
					header={headerContent}
					visible={showModal}
					style={{ width: "90vw", maxWidth: 600 }}
					modal
					onHide={handleCancel}
					draggable={false}
					resizable={false}
					className="p-fluid"
					closeOnEscape
					dismissableMask
					contentClassName="border-round-bottom"
				>
					<div className="p-4">
						<CreateUser 
							onSuccess={handleSuccess} 
							user={selectedUser} 
							onCancel={handleCancel}
						/>
					</div>
				</Dialog>

				<div className="overflow-x-auto">
					<DynamicTable<IUser>
						columns={columns}
						value={data}
						loading={loading}
						onPage={onTableChange}
						onFilter={handleFilter}
						totalRecords={pagination?.totalDocs || 0}
						actions={actions}
						globalSearchFields={["userName", "name", "lastName", "email", "role.name"]}
						emptyMessage="No se encontraron usuarios"
						rowsPerPageOptions={[10, 25, 50]}
					/>
				</div>
			</Card>
		</>
	);
};

export default ListUsers;
