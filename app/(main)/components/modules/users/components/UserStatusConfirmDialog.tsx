import { ConfirmDialog } from 'primereact/confirmdialog';
import { UserStatus } from '../lib/enums';

interface UserStatusConfirmDialogProps {
    show: boolean;
    onConfirm: () => Promise<void>;
    onReject: () => void;
    pendingAction: {
        userId: number;
        status: UserStatus;
    } | null;
}

export const UserStatusConfirmDialog = ({
    show,
    onConfirm,
    onReject,
    pendingAction
}: UserStatusConfirmDialogProps) => {
    return (
        <ConfirmDialog
            visible={show}
            onHide={onReject}
            message={`¿Estás seguro que deseas ${pendingAction?.status === UserStatus.ACTIVE ? 'activar' : 'suspender'} este usuario?`}
            header="Confirmación"
            icon="pi pi-exclamation-triangle"
            accept={onConfirm}
            reject={onReject}
            acceptLabel="Sí"
            rejectLabel="No"
            acceptIcon="pi pi-check"
            rejectIcon="pi pi-times"
            acceptClassName={pendingAction?.status === UserStatus.ACTIVE ? 'p-button-success' : 'p-button-danger'}
            rejectClassName="p-button-secondary"
        />
    );
}; 