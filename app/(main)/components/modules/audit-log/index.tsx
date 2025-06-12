'use client';
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuditLog } from './hooks/useAuditLog';
import { Timeline } from 'primereact/timeline';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import './styles.css';

export const AuditLog: React.FC = () => {
    const {
        data,
        loading,
        users,
        handleUserChange,
        selectedUser
    } = useAuditLog();

    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const getActionIcon = (action: string) => {
        switch (action.toLowerCase()) {
            case 'crear':
                return 'pi pi-plus-circle text-green-500 text-xl';
            case 'modificar':
                return 'pi pi-pencil text-yellow-500 text-xl';
            case 'eliminar':
                return 'pi pi-trash text-red-500 text-xl';
            case 'ver':
                return 'pi pi-eye text-blue-500 text-xl';
            default:
                return 'pi pi-info-circle text-gray-500 text-xl';
        }
    };

    const getModuleIcon = (module: string) => {
        switch (module.toLowerCase()) {
            case 'encuestas':
                return 'pi pi-file-edit text-indigo-500';
            case 'usuarios':
                return 'pi pi-users text-cyan-500';
            case 'preguntas':
                return 'pi pi-question-circle text-purple-500';
            case 'respuestas':
                return 'pi pi-check-square text-teal-500';
            case 'reportes':
                return 'pi pi-chart-bar text-orange-500';
            default:
                return 'pi pi-folder text-gray-500';
        }
    };

    // Mock before/after data for demo
    const getBeforeAfter = (item: any) => {
        // Simulación: si es modificar, muestra cambios; si es crear, before vacío; si es eliminar, after vacío
        if (item.action.toLowerCase() === 'modificar') {
            return {
                before: item.metadata?.Antes || { ...item.metadata, Estado: 'anterior' },
                after: item.metadata?.Despues || { ...item.metadata, Estado: 'actual' }
            };
        }
        if (item.action.toLowerCase() === 'crear') {
            return {
                before: {},
                after: item.metadata
            };
        }
        if (item.action.toLowerCase() === 'eliminar') {
            return {
                before: item.metadata,
                after: {}
            };
        }
        return { before: {}, after: {} };
    };

    const customizedMarker = (item: any) => {
        return (
            <span className="flex w-8 h-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                <i className={getActionIcon(item.action)} />
            </span>
        );
    };

    const customizedContent = (item: any) => {
        return (
            <Card className="mb-4 border-left-3 surface-border cursor-pointer hover:shadow-lg" onClick={() => { setSelectedItem(item); setVisible(true); }}>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <div className="text-lg font-semibold">{item.user.name}</div>
                            <div className="text-sm text-gray-500">{item.user.email}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                            {format(new Date(item.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className={`${getModuleIcon(item.module)} text-xl`} />
                        <span className="font-medium">{item.module}</span>
                        <Divider layout="vertical" />
                        <Tag value={item.action} severity={
                            item.action.toLowerCase() === 'crear' ? 'success' :
                            item.action.toLowerCase() === 'modificar' ? 'warning' :
                            item.action.toLowerCase() === 'eliminar' ? 'danger' :
                            'info'
                        } />
                    </div>
                    <p className="text-gray-700 m-0">{item.description}</p>
                </div>
            </Card>
        );
    };

    const renderDiff = (before: any, after: any) => {
        const allKeys = Array.from(new Set([...Object.keys(before || {}), ...Object.keys(after || {})]));
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold mb-2">Antes</h4>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        {Object.keys(before || {}).length === 0 ? <span className="text-gray-400">Sin datos</span> :
                            allKeys.map(key => (
                                <div key={key} className="mb-1 flex gap-2">
                                    <span className="font-medium text-gray-600">{key}:</span>
                                    <span className="text-gray-700">{JSON.stringify(before[key])}</span>
                                </div>
                            ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Después</h4>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        {Object.keys(after || {}).length === 0 ? <span className="text-gray-400">Sin datos</span> :
                            allKeys.map(key => (
                                <div key={key} className="mb-1 flex gap-2">
                                    <span className="font-medium text-gray-600">{key}:</span>
                                    <span className="text-gray-700">{JSON.stringify(after[key])}</span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4">
            <Card>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold m-0">Bitácora del Sistema</h2>
                            <p className="text-gray-600 mt-1">
                                Historial de actividades y cambios
                            </p>
                        </div>
                        <div className="w-80">
                            <Dropdown
                                value={selectedUser}
                                options={[{ id: 'all', name: 'Todos los usuarios' }, ...users]}
                                onChange={(e) => handleUserChange(e.value)}
                                optionLabel="name"
                                placeholder="Seleccionar usuario"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="pl-4">
                        <Timeline 
                            value={data} 
                            align="left"
                            className="customized-timeline"
                            marker={customizedMarker}
                            content={customizedContent}
                        />
                    </div>
                </div>
            </Card>
            <Dialog header="Detalle del cambio" visible={visible} style={{ width: '60vw', maxWidth: 700 }} onHide={() => setVisible(false)} draggable={false} resizable={false}>
                {selectedItem && (
                    <div>
                        <div className="mb-4">
                            <div className="text-lg font-semibold">{selectedItem.user.name}</div>
                            <div className="text-sm text-gray-500">{selectedItem.user.email}</div>
                            <div className="text-sm text-gray-500 mt-1">{format(new Date(selectedItem.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}</div>
                            <div className="flex items-center gap-2 mt-2">
                                <i className={`${getModuleIcon(selectedItem.module)} text-xl`} />
                                <span className="font-medium">{selectedItem.module}</span>
                                <Divider layout="vertical" />
                                <Tag value={selectedItem.action} severity={
                                    selectedItem.action.toLowerCase() === 'crear' ? 'success' :
                                    selectedItem.action.toLowerCase() === 'modificar' ? 'warning' :
                                    selectedItem.action.toLowerCase() === 'eliminar' ? 'danger' :
                                    'info'
                                } />
                            </div>
                            <p className="text-gray-700 m-0 mt-2">{selectedItem.description}</p>
                        </div>
                        {(() => {
                            const { before, after } = getBeforeAfter(selectedItem);
                            return renderDiff(before, after);
                        })()}
                    </div>
                )}
            </Dialog>
        </div>
    );
}; 