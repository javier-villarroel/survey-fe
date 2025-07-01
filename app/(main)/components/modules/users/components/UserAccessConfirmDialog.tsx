import { ConfirmDialog } from 'primereact/confirmdialog';

interface UserAccessConfirmDialogProps {
    showConfirmDialog: boolean;
    handleConfirm: () => Promise<void>;
    handleReject: () => void;
    pendingAction: {
        userId: number;
        isGranting: boolean;
    } | null;
}

export const UserAccessConfirmDialog = ({
    showConfirmDialog,
    handleConfirm,
    handleReject,
    pendingAction
}: UserAccessConfirmDialogProps) => {
    return (
        <ConfirmDialog
            visible={showConfirmDialog}
            onHide={handleReject}
            message={`¿Estás seguro que deseas ${pendingAction?.isGranting ? 'asignar' : 'revocar'} el acceso de administrador a este usuario?`}
            header="Confirmación"
            icon="pi pi-exclamation-triangle"
            accept={handleConfirm}
            reject={handleReject}
            acceptLabel="Sí"
            rejectLabel="No"
            acceptIcon="pi pi-check"
            rejectIcon="pi pi-times"
            acceptClassName={pendingAction?.isGranting ? 'p-button-primary' : 'p-button-danger'}
            rejectClassName="p-button-secondary"
        />
    );
}; 