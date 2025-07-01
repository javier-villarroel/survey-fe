import { ConfirmDialog } from 'primereact/confirmdialog';
import { UserStatus } from '../lib/enums';

interface UserStatusConfirmDialogProps {
    showConfirmDialog: boolean;
    handleConfirm: () => Promise<void>;
    handleReject: () => void;
    pendingAction: {
        userId: number;
        status: UserStatus;
    } | null;
}

export const UserStatusConfirmDialog = ({
    showConfirmDialog,
    handleConfirm,
    handleReject,
    pendingAction
}: UserStatusConfirmDialogProps) => {
    return (
        <ConfirmDialog
            visible={showConfirmDialog}
            onHide={handleReject}
            message={`¿Estás seguro que deseas ${pendingAction?.status === UserStatus.ACTIVE ? 'activar' : 'suspender'} este usuario?`}
            header="Confirmación"
            icon="pi pi-exclamation-triangle"
            accept={handleConfirm}
            reject={handleReject}
            acceptLabel="Sí"
            rejectLabel="No"
            acceptIcon="pi pi-check"
            rejectIcon="pi pi-times"
            acceptClassName={pendingAction?.status === UserStatus.ACTIVE ? 'p-button-success' : 'p-button-danger'}
            rejectClassName="p-button-secondary"
        />
    );
}; 