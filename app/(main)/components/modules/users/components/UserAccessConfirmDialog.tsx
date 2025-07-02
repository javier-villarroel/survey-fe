import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface UserAccessConfirmDialogProps {
    showConfirmDialog: boolean;
    handleConfirm: () => Promise<boolean | void>;
    handleReject: () => void;
    pendingAction: {
        userId: number;
        isAdmin: boolean;
    } | null;
}

export const UserAccessConfirmDialog = ({
    showConfirmDialog,
    handleConfirm,
    handleReject,
    pendingAction
}: UserAccessConfirmDialogProps) => {
    if (!pendingAction) return null;

    const { isAdmin } = pendingAction;

    return (
        <Dialog
            visible={showConfirmDialog}
            style={{ width: '450px' }}
            header={`${isAdmin ? 'Asignar' : 'Remover'} Acceso de Administrador`}
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
                        className={isAdmin ? 'p-button-success' : 'p-button-danger'}
                    />
                </div>
            }
            onHide={handleReject}
        >
            <div className="flex align-items-center justify-content-center">
                <i 
                    className={`pi ${isAdmin ? 'pi-user-plus' : 'pi-user-minus'} mr-3`} 
                    style={{ fontSize: '2rem' }}
                />
                <span>
                    ¿Está seguro que desea {isAdmin ? 'asignar' : 'remover'} el acceso de administrador a este usuario?
                </span>
            </div>
        </Dialog>
    );
}; 