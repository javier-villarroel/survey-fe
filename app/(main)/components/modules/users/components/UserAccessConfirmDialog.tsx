import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { IUser } from '../services/types';

interface PendingAction {
    user: IUser;
    action: "ASSIGN" | "UNASSIGN";
}

interface UserAccessConfirmDialogProps {
    showConfirmDialog: boolean;
    handleConfirm: () => Promise<boolean | void>;
    handleReject: () => void;
    pendingAction: PendingAction | null;
}

export const UserAccessConfirmDialog = ({
    showConfirmDialog,
    handleConfirm,
    handleReject,
    pendingAction
}: UserAccessConfirmDialogProps) => {
    if (!pendingAction) return null;

    const isAssigning = pendingAction.action === "UNASSIGN";

    return (
        <Dialog
            visible={showConfirmDialog}
            style={{ width: '450px' }}
            header={`${isAssigning ? 'Asignar' : 'Revocar'} Acceso de Administrador`}
            modal
            footer={
                <div>
                    <Button
                        label="Cancelar"
                        icon="pi pi-times"
                        onClick={handleReject}
                        className="p-button-text"
                    />
                    <Button
                        label="Confirmar"
                        icon="pi pi-check"
                        onClick={handleConfirm}
                        autoFocus
                        className={isAssigning ? 'p-button-success' : 'p-button-danger'}
                    />
                </div>
            }
            onHide={handleReject}
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