import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { IUser } from '../services/types';

interface PendingAction {
    user: IUser;
    action: "ASSIGN" | "UNASSIGN";
}

interface UserAccessConfirmDialogProps {
    show: boolean;
    onConfirm: () => Promise<boolean | void>;
    onReject: () => void;
    pendingAction: PendingAction | null;
}

export const UserAccessConfirmDialog = ({
    show,
    onConfirm,
    onReject,
    pendingAction
}: UserAccessConfirmDialogProps) => {
    if (!pendingAction) return null;

    const isAssigning = pendingAction.action === "UNASSIGN";

    return (
        <Dialog
            visible={show}
            style={{ width: '450px' }}
            header={`${isAssigning ? 'Asignar' : 'Revocar'} Acceso de Administrador`}
            modal
            footer={
                <div>
                    <Button
                        label="Cancelar"
                        icon="pi pi-times"
                        onClick={onReject}
                        className="p-button-text"
                    />
                    <Button
                        label="Confirmar"
                        icon="pi pi-check"
                        onClick={onConfirm}
                        autoFocus
                        className={isAssigning ? 'p-button-success' : 'p-button-danger'}
                    />
                </div>
            }
            onHide={onReject}
        >
            <div className="flex align-items-center justify-content-center">
                <i 
                    className={`pi ${isAssigning ? 'pi-user-plus' : 'pi-user-minus'} mr-3`} 
                    style={{ fontSize: '2rem' }}
                />
                <span>
                    ¿Está seguro que desea {isAssigning ? 'asignar' : 'revocar'} el acceso de administrador a este usuario?
                </span>
            </div>
        </Dialog>
    );
}; 