import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface AuditLogDialogProps {
    visible: boolean;
    onHide: () => void;
    selectedItem: any;
    getModuleIcon: (module: string) => string;
}

export const AuditLogDialog: React.FC<AuditLogDialogProps> = ({
    visible,
    onHide,
    selectedItem,
    getModuleIcon
}) => {
    if (!selectedItem) return null;

    const getActionSeverity = (action: string) => {
        switch (action.toLowerCase()) {
            case 'crear':
                return 'success';
            case 'modificar':
                return 'warning';
            case 'eliminar':
                return 'danger';
            case 'ver':
                return 'info';
            default:
                return 'info';
        }
    };

    return (
        <Dialog 
            header="Detalle del cambio" 
            visible={visible} 
            style={{ width: '90vw', maxWidth: 700 }} 
            onHide={onHide} 
            draggable={false} 
            resizable={false}
            className="audit-log-dialog"
        >
            <div>
                <div className="mb-4">
                    <div className="text-lg font-semibold">{selectedItem.user.name}</div>
                    <div className="text-sm text-gray-500">{selectedItem.user.email}</div>
                    <div className="text-sm text-gray-500 mt-1">
                        {format(new Date(selectedItem.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <i className={`${getModuleIcon(selectedItem.module)} text-xl`} />
                        <span className="font-medium">{selectedItem.module}</span>
                        <Divider layout="vertical" />
                        <Tag 
                            value={selectedItem.action} 
                            severity={getActionSeverity(selectedItem.action)}
                            className="action-tag"
                        />
                    </div>
                    <p className="text-gray-700 m-0 mt-2">{selectedItem.description}</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Antes</h3>
                        <div className="flex flex-col gap-2">
                            {Object.entries(selectedItem.metadata.Antes).length > 0 ? (
                                Object.entries(selectedItem.metadata.Antes).map(([key, value]: [string, any]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[120px] capitalize">{key}:</span>
                                        <span className="text-gray-700">{String(value)}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 italic">Sin cambios previos</div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Después</h3>
                        <div className="flex flex-col gap-2">
                            {Object.entries(selectedItem.metadata.Despues).length > 0 ? (
                                Object.entries(selectedItem.metadata.Despues).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[120px] capitalize">{key}:</span>
                                        <span className="text-gray-700">{String(value)}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 italic">Sin cambios posteriores</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}; 