'use client';

import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ColorPicker } from 'primereact/colorpicker';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { IStimulus, IStimulusImport, StimulusType } from '../../../types/project.types';
import { generateTemplateFile, processImportedFile, validateStimulus, convertImportToStimulus } from '../../../services/stimulusImport';
import { stimulusTypes } from '../../../mocks/data';

interface StimuliManagerProps {
    stimuli: IStimulus[];
    setStimuli: React.Dispatch<React.SetStateAction<IStimulus[]>>;
}

export const StimuliManager: React.FC<StimuliManagerProps> = ({ stimuli, setStimuli }) => {
    const toast = useRef<Toast>(null);
    const importFileInputRef = useRef<HTMLInputElement>(null);
    
    // Estados para el modal de estímulos
    const [showStimulusModal, setShowStimulusModal] = useState(false);
    const [selectedStimulusType, setSelectedStimulusType] = useState<StimulusType | null>(null);
    const [stimulusName, setStimulusName] = useState('');
    const [stimulusValue, setStimulusValue] = useState('');
    const [stimulusPreview, setStimulusPreview] = useState<string | null>(null);
    const [stimulusFile, setStimulusFile] = useState<File | null>(null);

    // Estado para el modal de importación
    const [showImportModal, setShowImportModal] = useState(false);
    const [importedStimuli, setImportedStimuli] = useState<IStimulusImport[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File }>({});
    const [importErrors, setImportErrors] = useState<{ [key: string]: string[] }>({});

    const handleStimulusTypeChange = (e: { value: StimulusType }) => {
        setSelectedStimulusType(e.value);
        setStimulusValue('');
        setStimulusPreview(null);
        setStimulusFile(null);
    };

    const handleStimulusFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setStimulusFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setStimulusPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddStimulus = () => {
        if (!selectedStimulusType || !stimulusName) return;

        const newStimulus: IStimulus = {
            id: Date.now().toString(),
            type: selectedStimulusType,
            name: stimulusName,
            value: selectedStimulusType === 'color' ? stimulusValue : stimulusPreview || '',
            size: stimulusFile?.size,
            createdAt: new Date().toISOString()
        };

        setStimuli(prev => [...prev, newStimulus]);
        setShowStimulusModal(false);
        resetStimulusForm();
    };

    const resetStimulusForm = () => {
        setSelectedStimulusType(null);
        setStimulusName('');
        setStimulusValue('');
        setStimulusPreview(null);
        setStimulusFile(null);
    };

    const renderStimulusInput = () => {
        if (!selectedStimulusType) return null;

        switch (selectedStimulusType) {
            case 'color':
                return (
                    <div className="field">
                        <label htmlFor="colorPicker">Color</label>
                        <div className="flex align-items-center gap-2">
                            <ColorPicker
                                id="colorPicker"
                                value={stimulusValue.replace('#', '')}
                                onChange={(e) => setStimulusValue('#' + e.value)}
                                className="w-2rem"
                            />
                            <InputText
                                value={stimulusValue}
                                onChange={(e) => setStimulusValue(e.target.value)}
                                placeholder="#FFFFFF"
                                className="w-full"
                            />
                            {stimulusValue && (
                                <div
                                    className="w-3rem h-3rem border-1 border-round"
                                    style={{ backgroundColor: stimulusValue }}
                                />
                            )}
                        </div>
                    </div>
                );
            case 'sound':
                return (
                    <div className="field">
                        <label htmlFor="soundFile">Archivo de audio</label>
                        <input
                            type="file"
                            id="soundFile"
                            accept="audio/*"
                            onChange={handleStimulusFileChange}
                            className="w-full"
                        />
                        {stimulusPreview && (
                            <audio controls className="mt-2 w-full">
                                <source src={stimulusPreview} />
                            </audio>
                        )}
                    </div>
                );
            case 'video':
                return (
                    <div className="field">
                        <label htmlFor="videoFile">Archivo de video</label>
                        <input
                            type="file"
                            id="videoFile"
                            accept="video/*"
                            onChange={handleStimulusFileChange}
                            className="w-full"
                        />
                        {stimulusPreview && (
                            <video controls className="mt-2 w-full">
                                <source src={stimulusPreview} />
                            </video>
                        )}
                    </div>
                );
            case 'image':
                return (
                    <div className="field">
                        <label htmlFor="imageFile">Archivo de imagen</label>
                        <input
                            type="file"
                            id="imageFile"
                            accept="image/*"
                            onChange={handleStimulusFileChange}
                            className="w-full"
                        />
                        {stimulusPreview && (
                            <img
                                src={stimulusPreview}
                                alt="Preview"
                                className="mt-2 w-full max-w-20rem"
                            />
                        )}
                    </div>
                );
        }
    };

    const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const importedData = await processImportedFile(file);
            setImportedStimuli(importedData);
            setShowImportModal(true);
            
            // Limpiar errores anteriores
            setImportErrors({});
            
            // Validar cada estímulo
            const errors: { [key: string]: string[] } = {};
            importedData.forEach((stimulus, index) => {
                const validationErrors = validateStimulus(stimulus);
                if (validationErrors.length > 0) {
                    errors[index] = validationErrors;
                }
            });
            
            setImportErrors(errors);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al procesar el archivo',
                life: 3000
            });
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFiles(prev => ({
                ...prev,
                [index]: file
            }));
        }
    };

    const handleImportStimuli = async () => {
        const newStimuli: IStimulus[] = [];
        
        for (let i = 0; i < importedStimuli.length; i++) {
            const importData = importedStimuli[i];
            const file = selectedFiles[i];
            
            try {
                const stimulus = await convertImportToStimulus(importData, file);
                newStimuli.push(stimulus);
            } catch (error) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Error al procesar el estímulo ${importData.name}`,
                    life: 3000
                });
            }
        }
        
        setStimuli(prev => [...prev, ...newStimuli]);
        setShowImportModal(false);
        setImportedStimuli([]);
        setSelectedFiles({});
        setImportErrors({});
    };

    // Funciones para la tabla de estímulos
    const formatDate = (value: string) => {
        return format(new Date(value), 'dd/MM/yyyy HH:mm', { locale: es });
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDuration = (seconds?: number) => {
        if (!seconds) return '-';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const typeBodyTemplate = (rowData: IStimulus) => {
        const getSeverity = (type: string) => {
            switch (type) {
                case 'image':
                    return 'info';
                case 'video':
                    return 'warning';
                case 'sound':
                    return 'success';
                case 'color':
                    return 'secondary';
                default:
                    return null;
            }
        };

        return <Tag value={rowData.type} severity={getSeverity(rowData.type)} />;
    };

    const valueBodyTemplate = (rowData: IStimulus) => {
        if (rowData.type === 'color') {
            return (
                <div className="flex align-items-center">
                    <div
                        className="w-2rem h-2rem border-1 border-round mr-2"
                        style={{ backgroundColor: rowData.value }}
                    />
                    {rowData.value}
                </div>
            );
        }
        return rowData.value;
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="card">
                <div className="flex justify-content-between align-items-center mb-4">
                    <h5 className="m-0">Estímulos</h5>
                    <div className="flex gap-2">
                        <Button
                            icon="pi pi-download"
                            label="Descargar Plantilla"
                            className="p-button-secondary"
                            onClick={generateTemplateFile}
                        />
                        <div className="relative">
                            <Button
                                icon="pi pi-upload"
                                label="Importar Excel"
                                className="p-button-success"
                                onClick={() => importFileInputRef.current?.click()}
                            />
                            <input
                                type="file"
                                ref={importFileInputRef}
                                onChange={handleImportFile}
                                accept=".xlsx,.xls"
                                className="hidden"
                            />
                        </div>
                        <Button
                            icon="pi pi-plus"
                            label="Agregar Estímulo"
                            onClick={() => setShowStimulusModal(true)}
                            style={{
                                backgroundColor: '#000e28',
                                borderColor: '#000e28'
                            }}
                        />
                    </div>
                </div>

                <DataTable
                    value={stimuli}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="p-datatable-gridlines"
                    showGridlines
                    stripedRows
                    emptyMessage="No hay estímulos agregados"
                >
                    <Column field="name" header="Nombre" />
                    <Column field="type" header="Tipo" body={typeBodyTemplate} />
                    <Column field="value" header="Valor" body={valueBodyTemplate} />
                    <Column 
                        field="size" 
                        header="Tamaño" 
                        body={(rowData) => formatFileSize(rowData.size)} 
                    />
                    <Column 
                        field="duration" 
                        header="Duración" 
                        body={(rowData) => formatDuration(rowData.duration)} 
                    />
                    <Column 
                        field="createdAt" 
                        header="Fecha de creación" 
                        body={(rowData) => formatDate(rowData.createdAt)} 
                    />
                </DataTable>
            </div>

            <Dialog
                header="Agregar Estímulo"
                visible={showStimulusModal}
                onHide={() => {
                    setShowStimulusModal(false);
                    resetStimulusForm();
                }}
                style={{ width: '50vw' }}
                modal
                footer={
                    <div>
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            onClick={() => {
                                setShowStimulusModal(false);
                                resetStimulusForm();
                            }}
                            className="p-button-text"
                        />
                        <Button
                            label="Agregar"
                            icon="pi pi-check"
                            onClick={handleAddStimulus}
                            disabled={!selectedStimulusType || !stimulusName || (!stimulusValue && !stimulusPreview)}
                        />
                    </div>
                }
            >
                <div className="grid formgrid p-fluid">
                    <div className="field col-12">
                        <label htmlFor="stimulusName">Nombre del estímulo</label>
                        <InputText
                            id="stimulusName"
                            value={stimulusName}
                            onChange={(e) => setStimulusName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="stimulusType">Tipo de estímulo</label>
                        <Dropdown
                            id="stimulusType"
                            value={selectedStimulusType}
                            options={stimulusTypes}
                            onChange={handleStimulusTypeChange}
                            placeholder="Seleccione un tipo"
                            required
                        />
                    </div>
                    <div className="field col-12">
                        {renderStimulusInput()}
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Importar Estímulos"
                visible={showImportModal}
                onHide={() => {
                    setShowImportModal(false);
                    setImportedStimuli([]);
                    setSelectedFiles({});
                    setImportErrors({});
                }}
                style={{ width: '70vw' }}
                modal
                footer={
                    <div>
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            onClick={() => {
                                setShowImportModal(false);
                                setImportedStimuli([]);
                                setSelectedFiles({});
                                setImportErrors({});
                            }}
                            className="p-button-text"
                        />
                        <Button
                            label="Importar"
                            icon="pi pi-check"
                            onClick={handleImportStimuli}
                            disabled={
                                importedStimuli.length === 0 ||
                                Object.keys(importErrors).length > 0 ||
                                importedStimuli.some((s, i) => 
                                    s.type !== 'color' && !selectedFiles[i]
                                )
                            }
                        />
                    </div>
                }
            >
                <div className="grid formgrid p-fluid">
                    {importedStimuli.map((stimulus, index) => (
                        <div key={index} className="col-12 border-bottom-1 surface-border p-3">
                            <div className="flex align-items-center justify-content-between">
                                <div className="flex-grow-1">
                                    <h6 className="mt-0 mb-2">{stimulus.name}</h6>
                                    <div className="flex align-items-center gap-3">
                                        <Tag value={stimulus.type} />
                                        {stimulus.type === 'color' ? (
                                            <div className="flex align-items-center">
                                                <div
                                                    className="w-2rem h-2rem border-1 border-round mr-2"
                                                    style={{ backgroundColor: stimulus.value }}
                                                />
                                                {stimulus.value}
                                            </div>
                                        ) : (
                                            <div className="flex-grow-1">
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleFileSelect(e, index)}
                                                    accept={
                                                        stimulus.type === 'image' ? 'image/*' :
                                                        stimulus.type === 'video' ? 'video/*' :
                                                        'audio/*'
                                                    }
                                                    className="w-full"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {importErrors[index]?.length > 0 && (
                                <div className="mt-2">
                                    {importErrors[index].map((error, errorIndex) => (
                                        <div key={errorIndex} className="text-red-500 text-sm">
                                            {error}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Dialog>
        </>
    );
}; 