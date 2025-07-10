"use client";

import { DynamicTable } from "@/app/(main)/components/common/components/table/DynamicTable";
import { DataTableStateEvent } from 'primereact/datatable';
import { useUsersTable } from "../../hooks/useUsersTable";
import { UserFilters } from "../../components/UserFilters";
import PermissionError from "@/app/(main)/components/common/components/error/PermissionError";
import { useCurrentUser } from "../../hooks/useCurrentUser";

import { createActions } from "./config/actions";
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import { IUser } from "../../services/types";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { columns } from "./config/columns";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import React, { useState } from "react";
import { Card } from "primereact/card";
import { CreateUser } from "../create";
import { UserDetails } from "../details";
import { UserStatus, UserRoles } from "../../lib/enums";
import { UserStatusConfirmDialog } from "../../components/UserStatusConfirmDialog";
import { UserAccessConfirmDialog } from "../../components/UserAccessConfirmDialog";
import { TableParams } from "../../hooks/useUsersTable";
import { useChangeUserStatus } from "../../hooks/changeStatus/useChangeUserStatus";
import { useAddUserAccess } from "../../hooks/changeStatus/useAddUserAccess";
import { useRemoveUser } from "../../hooks/changeStatus/useRemoveUser";
import AccessDeniedPage from "@/app/(full-page)/auth/access/page";

const pageSizeOptions = [
	{ label: '5 por página', value: 5 },
	{ label: '10 por página', value: 10 },
	{ label: '20 por página', value: 20 }
];

const roleOptions = [
	{ label: 'Todos', value: '' },
	{ label: 'Administrador', value: UserRoles.ADMIN },
	{ label: 'Sin rol', value: 'NO_ROLE' }
];

const statusOptions = [
	{ label: 'Todos', value: '' },
	{ label: 'Activo', value: UserStatus.ACTIVE },
	{ label: 'Suspendido', value: UserStatus.SUSPENDED },
	{ label: 'Bloqueado', value: UserStatus.BLOQUED }
];

const LoadingSkeleton = () => {
	return (
		<div className="w-full">
			{/* Header skeleton */}
			<div className="flex justify-between mb-4">
				<Skeleton width="15rem" height="2rem" />
				<Skeleton width="10rem" height="2.5rem" className="mr-2" />
			</div>

			{/* Table header skeleton */}
			<div className="flex gap-3 mb-3">
				{Array(5).fill(0).map((_, index) => (
					<Skeleton key={`header-${index}`} width="15rem" height="3rem" />
				))}
			</div>

			{/* Table rows skeleton */}
			{Array(5).fill(0).map((_, rowIndex) => (
				<div key={`row-${rowIndex}`} className="flex gap-3 mb-3">
					{Array(5).fill(0).map((_, colIndex) => (
						<Skeleton key={`cell-${rowIndex}-${colIndex}`} width="15rem" height="3rem" />
					))}
				</div>
			))}

			{/* Pagination skeleton */}
			<div className="flex justify-content-between align-items-center mt-4">
				<Skeleton width="10rem" height="2.5rem" />
				<div className="flex gap-2">
					{Array(5).fill(0).map((_, index) => (
						<Skeleton key={`page-${index}`} width="3rem" height="2.5rem" />
					))}
				</div>
			</div>
		</div>
	);
};

interface UserFilters {
	firstName?: string;
	lastName?: string;
	email?: string;
	'role.name'?: string;
	status?: string;
}

const ListUsers = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
	const [queryParams, setQueryParams] = useState<TableParams>({ 
		page: 1, 
		limit: 5, 
		filters: {
			firstName: undefined,
			lastName: undefined,
			email: undefined,
			'role.name': undefined,
			status: undefined
		}
	});

	const { currentUserEmail, isLoading: currentUserLoading } = useCurrentUser();
	const { data, loading, error, pagination, handleFilter, refreshData } = useUsersTable();
	const { 
		changeUserStatus, 
		toast: statusToast,
		showConfirmDialog: showStatusConfirmDialog,
		handleConfirm: handleStatusConfirm,
		handleReject: handleStatusReject,
		pendingAction: pendingStatusAction
	} = useChangeUserStatus();
	const { 
		toggleUserAccess, 
		toast: accessToast,
		showConfirmDialog: showAccessConfirmDialog,
		handleConfirm: handleAccessConfirm,
		handleReject: handleAccessReject,
		pendingAction: pendingAccessAction
	} = useAddUserAccess();
	const { removeUser, toast: removeToast } = useRemoveUser();

	const handleEdit = (user: IUser) => {
		setSelectedUser(user);
		setShowModal(true);
	};

	const handleStatusChange = (user: IUser, newStatus: UserStatus) => {
		const userId = typeof user.id === 'number' ? user.id : parseInt(user.id);
		changeUserStatus(userId, newStatus);
	};

	const handleAccessChange = (user: IUser) => {
		toggleUserAccess(user);
	};

	const handleRemove = (user: IUser) => {
		confirmDialog({
			message: '¿Está seguro que desea eliminar este usuario?',
			header: 'Confirmar Eliminación',
			icon: 'pi pi-exclamation-triangle',
			acceptClassName: 'p-button-danger',
			accept: async () => {
				const userId = typeof user.id === 'number' ? user.id : parseInt(user.id);
				const result = await removeUser(userId);
				if (result) {
					refreshData();
				}
			}
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

	const onPageChange = (event: { first: number; rows: number; page: number }) => {
		const newParams = {
			page: event.page + 1,
			limit: event.rows,
			filters: queryParams.filters
		};
		setQueryParams(newParams);
		handleFilter(newParams);
	};

	const handleTablePage = (event: DataTableStateEvent) => {
		if (event.page !== undefined && event.rows !== undefined) {
			const newParams = {
				page: event.page + 1,
				limit: event.rows,
				filters: event.filters || {}
			};
			setQueryParams(newParams);
			handleFilter(newParams);
		}
	};

	const handleFilterChange = (field: string, value: any) => {
		const newParams = {
			...queryParams,
			page: 1, // Reset to first page when filter changes
			filters: {
				...queryParams.filters,
				[field]: value
			}
		};
		setQueryParams(newParams);
		handleFilter(newParams);
	};

	const handleClearFilters = () => {
		const newParams = {
			...queryParams,
			page: 1,
			filters: {}
		};
		setQueryParams(newParams);
		handleFilter(newParams);
	};

	const handlePageSizeChange = (e: { value: number }) => {
		const newParams = {
			...queryParams,
			page: 1,
			limit: e.value
		};
		setQueryParams(newParams);
		handleFilter(newParams);
	};

	const actions = createActions({
		onEdit: handleEdit,
		onStatusChange: handleStatusChange,
		onAccessChange: handleAccessChange,
		onRemove: handleRemove,
		currentUserEmail
	});

	const headerContent = (
		<div className="flex align-items-center gap-2">
			<i className={`pi ${selectedUser ? 'pi-user-edit' : 'pi-user-plus'} text-xl`}></i>
			<span className="font-medium text-xl">
				{selectedUser ? "Editar usuario" : "Crear usuario"}
			</span>
		</div>
	);

	if (error) {
		return <AccessDeniedPage  />;
		// return <PermissionError message={error instanceof Error ? error.message : "Error al cargar los usuarios"} />;

	}

	if (loading || currentUserLoading) {
		return <LoadingSkeleton />;
	}

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
							backgroundColor: '#000e28',
							borderColor: '#000e28'
						}}
					/>
				</div>
			</div>
			<Card className="w-full shadow-2">
				<div className="flex flex-column gap-4">
					<UserFilters 
						filters={queryParams.filters}
						onFilterChange={handleFilterChange}
						onClearFilters={handleClearFilters}
					/>
					<DynamicTable<IUser>
						value={data}
						loading={loading}
						columns={columns}
						actions={actions}
						showFilters={false}
						onPage={handleTablePage}
						totalRecords={pagination?.totalDocs}
						totalPages={pagination?.totalPages}
						emptyMessage="No se encontraron usuarios"
						showPaginator={false}
						rowsPerPageOptions={[5, 10, 20]}
					/>
					<div className="flex align-items-center justify-content-center gap-4">
						<div className="flex align-items-center gap-2">
							<span className="text-sm">Mostrar:</span>
							<Dropdown
								value={pagination?.rowsPerPage ?? 5}
								options={pageSizeOptions}
								onChange={handlePageSizeChange}
								className="w-auto"
							/>
						</div>
						<Paginator
							first={(pagination?.currentPage ? pagination.currentPage - 1 : 0) * (pagination?.rowsPerPage ?? 5)}
							rows={pagination?.rowsPerPage}
							totalRecords={pagination?.totalDocs}
							onPageChange={onPageChange}
							template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
						/>
					</div>
				</div>
			</Card>

			<Dialog
				visible={showModal}
				onHide={handleCancel}
				header={headerContent}
				modal
				className="p-fluid w-full md:w-8 lg:w-6"
				contentClassName="p-0"
			>
				{selectedUser ? (
					<UserDetails
						user={selectedUser}
						onSuccess={handleSuccess}
						onCancel={handleCancel}
					/>
				) : (
					<CreateUser
						onSuccess={handleSuccess}
						onCancel={handleCancel}
					/>
				)}
			</Dialog>

			<UserStatusConfirmDialog
				show={showStatusConfirmDialog}
				onConfirm={async () => {
					const result = await handleStatusConfirm();
					if (result !== null) {
						refreshData();
					}
				}}
				onReject={handleStatusReject}
				pendingAction={pendingStatusAction}
			/>

			<UserAccessConfirmDialog
				show={showAccessConfirmDialog}
				onConfirm={async () => {
					const result = await handleAccessConfirm();
					if (result) {
						refreshData();
					}
				}}
				onReject={handleAccessReject}
				pendingAction={pendingAccessAction}
			/>

			<ConfirmDialog />
			<Toast ref={statusToast} />
			<Toast ref={accessToast} />
			<Toast ref={removeToast} />
		</>
	);
};

export default ListUsers;
