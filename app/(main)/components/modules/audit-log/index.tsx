'use client';
import React, { useState, useMemo } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Timeline } from 'primereact/timeline';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { Paginator } from 'primereact/paginator';
import './styles.css';

export const AuditLog: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<any>({ id: 'all', name: 'Todos los usuarios' });
    const [users] = useState([
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
        { id: 2, name: 'María García', email: 'maria@example.com' },
        { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
        { id: 4, name: 'Ana Martínez', email: 'ana@example.com' },
        { id: 5, name: 'Roberto Sánchez', email: 'roberto@example.com' }
    ]);

    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const [data] = useState([
        {
            id: 1,
            user: { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
            created_at: '2024-03-15T10:30:00',
            module: 'Encuestas',
            action: 'Crear',
            description: 'Se creó una nueva encuesta',
            metadata: {
                Antes: {},
                Despues: {
                    titulo: 'Encuesta de Satisfacción',
                    estado: 'activo'
                }
            }
        },
        {
            id: 2,
            user: { id: 2, name: 'María García', email: 'maria@example.com' },
            created_at: '2024-03-15T14:00:00',
            module: 'Usuarios',
            action: 'Modificar',
            description: 'Se modificó un usuario',
            metadata: {
                Antes: {
                    nombre: 'Juan',
                    estado: 'inactivo'
                },
                Despues: {
                    nombre: 'Juan',
                    estado: 'activo'
                }
            }
        },
        {
            id: 3,
            user: { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
            created_at: '2024-03-15T15:30:00',
            module: 'Preguntas',
            action: 'Eliminar',
            description: 'Se eliminó una pregunta',
            metadata: {
                Antes: {
                    pregunta: '¿Cómo calificaría nuestro servicio?',
                    tipo: 'escala'
                },
                Despues: {}
            }
        },
        {
            id: 4,
            user: { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
            created_at: '2024-03-15T16:45:00',
            module: 'Respuestas',
            action: 'Ver',
            description: 'Se visualizaron las respuestas',
            metadata: {
                Antes: {},
                Despues: {
                    total_respuestas: 150,
                    fecha_consulta: '2024-03-15'
                }
            }
        },
        {
            id: 5,
            user: { id: 2, name: 'María García', email: 'maria@example.com' },
            created_at: '2024-03-15T17:30:00',
            module: 'Encuestas',
            action: 'Crear',
            description: 'Se creó una nueva encuesta',
            metadata: {
                Antes: {},
                Despues: {
                    titulo: 'Encuesta de Clima Laboral',
                    estado: 'activo'
                }
            }
        },
        {
            id: 6,
            user: { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
            created_at: '2024-03-15T18:15:00',
            module: 'Usuarios',
            action: 'Modificar',
            description: 'Se modificó un usuario',
            metadata: {
                Antes: {
                    nombre: 'María',
                    rol: 'editor'
                },
                Despues: {
                    nombre: 'María',
                    rol: 'admin'
                }
            }
        },
        {
            id: 7,
            user: { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
            created_at: '2024-03-15T19:00:00',
            module: 'Preguntas',
            action: 'Eliminar',
            description: 'Se eliminó una pregunta',
            metadata: {
                Antes: {
                    pregunta: '¿Recomendaría nuestro servicio?',
                    tipo: 'si/no'
                },
                Despues: {}
            }
        },
        {
            id: 8,
            user: { id: 2, name: 'María García', email: 'maria@example.com' },
            created_at: '2024-03-15T20:45:00',
            module: 'Respuestas',
            action: 'Ver',
            description: 'Se visualizaron las respuestas',
            metadata: {
                Antes: {},
                Despues: {
                    total_respuestas: 200,
                    fecha_consulta: '2024-03-15'
                }
            }
        },
        {
            id: 9,
            user: { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
            created_at: '2024-03-15T21:30:00',
            module: 'Encuestas',
            action: 'Crear',
            description: 'Se creó una nueva encuesta',
            metadata: {
                Antes: {},
                Despues: {
                    titulo: 'Encuesta de Producto',
                    estado: 'activo'
                }
            }
        },
        {
            id: 10,
            user: { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
            created_at: '2024-03-15T22:15:00',
            module: 'Usuarios',
            action: 'Modificar',
            description: 'Se modificó un usuario',
            metadata: {
                Antes: {
                    nombre: 'Carlos',
                    estado: 'activo'
                },
                Despues: {
                    nombre: 'Carlos',
                    estado: 'inactivo'
                }
            }
        },
        {
            id: 11,
            user: { id: 2, name: 'María García', email: 'maria@example.com' },
            created_at: '2024-03-15T23:00:00',
            module: 'Preguntas',
            action: 'Eliminar',
            description: 'Se eliminó una pregunta',
            metadata: {
                Antes: {
                    pregunta: '¿Qué mejoras sugeriría?',
                    tipo: 'texto'
                },
                Despues: {}
            }
        },
        {
            id: 12,
            user: { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
            created_at: '2024-03-16T00:45:00',
            module: 'Respuestas',
            action: 'Ver',
            description: 'Se visualizaron las respuestas',
            metadata: {
                Antes: {},
                Despues: {
                    total_respuestas: 75,
                    fecha_consulta: '2024-03-16'
                }
            }
        },
        {
            id: 13,
            user: { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
            created_at: '2024-03-16T01:30:00',
            module: 'Encuestas',
            action: 'Crear',
            description: 'Se creó una nueva encuesta',
            metadata: {
                Antes: {},
                Despues: {
                    titulo: 'Encuesta de Servicio al Cliente',
                    estado: 'activo'
                }
            }
        },
        {
            id: 14,
            user: { id: 2, name: 'María García', email: 'maria@example.com' },
            created_at: '2024-03-16T02:15:00',
            module: 'Usuarios',
            action: 'Modificar',
            description: 'Se modificó un usuario',
            metadata: {
                Antes: {
                    nombre: 'Ana',
                    rol: 'usuario'
                },
                Despues: {
                    nombre: 'Ana',
                    rol: 'editor'
                }
            }
        },
        {
            id: 15,
            user: { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
            created_at: '2024-03-16T03:00:00',
            module: 'Preguntas',
            action: 'Eliminar',
            description: 'Se eliminó una pregunta',
            metadata: {
                Antes: {
                    pregunta: '¿Cómo conoció nuestro servicio?',
                    tipo: 'opciones'
                },
                Despues: {}
            }
        }
    ]);

    const filteredData = useMemo(() => {
        if (selectedUser.id === 'all') {
            return data;
        }
        return data.filter(item => item.user.id === selectedUser.id);
    }, [data, selectedUser]);

    const paginatedData = useMemo(() => {
        return filteredData.slice(first, first + rows);
    }, [filteredData, first, rows]);

    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };

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

    const getBeforeAfter = (item: any) => {
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

    const handleUserChange = (user: any) => {
        setSelectedUser(user);
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
                        <Tag 
                            value={item.action} 
                            severity={
                                item.action.toLowerCase() === 'crear' ? 'success' :
                                item.action.toLowerCase() === 'modificar' ? 'warning' :
                                item.action.toLowerCase() === 'eliminar' ? 'danger' :
                                'info'
                            }
                            className="action-tag"
                        />
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
        <div className="p-2 sm:p-4">
            <Card>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold m-0">Bitácora del Sistema</h2>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">
                            Historial de actividades y cambios
                        </p>
                    </div>
                    <div className="w-full sm:w-80">
                        <Dropdown
                            value={selectedUser}
                            options={[{ id: 'all', name: 'Todos los usuarios' }, ...users]}
                            onChange={(e) => handleUserChange(e.value)}
                            optionLabel="name"
                            placeholder="Seleccionar un usuario"
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-full">
                        <Timeline 
                            value={paginatedData} 
                            align="left"
                            className="customized-timeline"
                            marker={customizedMarker}
                            content={customizedContent}
                        />
                    </div>
                </div>
                <div className="flex justify-content-center mt-6 border-t pt-4">
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={filteredData.length}
                        rowsPerPageOptions={[10, 20, 50]}
                        onPageChange={onPageChange}
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        className="border-none"
                    />
                </div>
            </Card>
            <Dialog 
                header="Detalle del cambio" 
                visible={visible} 
                style={{ width: '90vw', maxWidth: 700 }} 
                onHide={() => setVisible(false)} 
                draggable={false} 
                resizable={false}
                className="audit-log-dialog"
            >
                {selectedItem && (
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
                                    severity={
                                        selectedItem.action.toLowerCase() === 'crear' ? 'success' :
                                        selectedItem.action.toLowerCase() === 'modificar' ? 'warning' :
                                        selectedItem.action.toLowerCase() === 'eliminar' ? 'danger' :
                                        'info'
                                    }
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
                )}
            </Dialog>
        </div>
    );
}; 

