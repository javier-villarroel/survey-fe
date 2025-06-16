'use client';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { mockStimuli, Stimulus, StimulusType } from '@/app/(main)/components/modules/projects/services/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Dialog } from 'primereact/dialog';
import { ColorPicker } from 'primereact/colorpicker';

const projectStatuses = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' },
    { label: 'Completado', value: 'completed' }
];

const stimulusTypes = [
    { label: 'Color', value: 'color' },
    { label: 'Sonido', value: 'sound' },
    { label: 'Video', value: 'video' },
    { label: 'Imagen', value: 'image' }
];

const CreateProject = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'active',
        logo: null as string | null
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [stimuli, setStimuli] = useState<Stimulus[]>(mockStimuli);
    
    // Estados para el modal de estímulos
    const [showStimulusModal, setShowStimulusModal] = useState(false);
    const [selectedStimulusType, setSelectedStimulusType] = useState<StimulusType | null>(null);
    const [stimulusName, setStimulusName] = useState('');
    const [stimulusValue, setStimulusValue] = useState('');
    const [stimulusPreview, setStimulusPreview] = useState<string | null>(null);
    const [stimulusFile, setStimulusFile] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusChange = (e: { value: string }) => {
        setFormData(prev => ({
            ...prev,
            status: e.value
        }));
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreviewImage(result);
                setFormData(prev => ({
                    ...prev,
                    logo: result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

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

        const newStimulus: Stimulus = {
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

    const handleImportCSV = (event: any) => {
        const file = event.files[0];
        if (file) {
            // TODO: Implementar la lógica de importación CSV
            console.log('Archivo CSV seleccionado:', file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // TODO: Implementar la lógica de creación del proyecto
            console.log('Datos del formulario:', formData);
            router.push('/proyectos');
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
        }
    };

    // Funciones para la tabla de estímulos
    const formatDate = (value: string) => {
        return format(new Date(value), 'dd/MM/yyyy HH:mm', { locale: es });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
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

    const typeBodyTemplate = (rowData: Stimulus) => {
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

    const sizeBodyTemplate = (rowData: Stimulus) => {
        return formatFileSize(rowData.size || 0);
    };

    const durationBodyTemplate = (rowData: Stimulus) => {
        return formatDuration(rowData.duration);
    };

    const dateBodyTemplate = (rowData: Stimulus) => {
        return formatDate(rowData.createdAt);
    };

    const valueBodyTemplate = (rowData: Stimulus) => {
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
        <div className="w-full overflow-x-hidden">
            <Card>
                <div className="flex align-items-center justify-content-between mb-4">
                    <h5 className="m-0">Crear Proyecto</h5>
                </div>
                <div className="grid">
                    <div className="col-12 lg:col-4">
                        <div className="card" style={{ minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
                            <h5>Logo del Proyecto</h5>
                            <div className="flex flex-column align-items-center justify-content-center gap-4" style={{ flex: 1, paddingTop: '1rem', paddingBottom: '1rem' }}>
                                <div 
                                    onClick={handleImageClick}
                                    className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity"
                                >
                                    {previewImage ? (
                                        <div className="relative overflow-hidden" style={{ 
                                            width: '12rem',
                                            height: '12rem',
                                            borderRadius: '50%',
                                        }}>
                                            <img
                                                src={previewImage}
                                                alt="Logo del proyecto"
                                                style={{ 
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    backgroundColor: 'var(--surface-b)',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <i className="pi pi-camera text-white text-2xl"></i>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative hover:shadow-lg transition-shadow">
                                            <i className="pi pi-image mt-3 p-5" style={{ 
                                                fontSize: '5em', 
                                                borderRadius: '50%', 
                                                backgroundColor: 'var(--surface-b)', 
                                                color: 'var(--surface-d)',
                                                width: '12rem',
                                                height: '12rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}></i>
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                                                <i className="pi pi-camera text-white text-2xl"></i>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <small className="text-gray-500">El tamaño recomendado es de 300x300 y peso de 2MB</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 lg:col-8">
                        <div className="card" style={{ minHeight: '340px' }}>
                            <h5>Información del Proyecto</h5>
                            <form onSubmit={handleSubmit} className="grid formgrid p-fluid">
                                <div className="field col-12">
                                    <label htmlFor="name" className="font-medium">
                                        Nombre del Proyecto
                                    </label>
                                    <InputText
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="field col-12">
                                    <label htmlFor="description" className="font-medium">
                                        Descripción
                                    </label>
                                    <InputTextarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="field col-12">
                                    <label htmlFor="status" className="font-medium">
                                        Estado
                                    </label>
                                    <Dropdown
                                        id="status"
                                        value={formData.status}
                                        options={projectStatuses}
                                        onChange={handleStatusChange}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card">
                            <div className="flex justify-content-between align-items-center mb-4">
                                <h5 className="m-0">Estímulos</h5>
                                <div className="flex gap-2">
                                    <FileUpload
                                        mode="basic"
                                        accept=".csv"
                                        maxFileSize={1000000}
                                        chooseLabel="Importar CSV"
                                        className="w-auto"
                                        onSelect={handleImportCSV}
                                    />
                                    <Button
                                        icon="pi pi-plus"
                                        label="Agregar Estímulo"
                                        onClick={() => setShowStimulusModal(true)}
                                        style={{
                                            backgroundColor: '#2dabd2',
                                            borderColor: '#2dabd2'
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
                                <Column field="size" header="Tamaño" body={sizeBodyTemplate} />
                                <Column field="duration" header="Duración" body={durationBodyTemplate} />
                                <Column field="createdAt" header="Fecha de creación" body={dateBodyTemplate} />
                            </DataTable>
                        </div>
                    </div>

                    <div className="col-12 flex justify-content-end mt-4">
                        <Button
                            type="button"
                            label="Cancelar"
                            severity="secondary"
                            outlined
                            onClick={() => router.push('/proyectos')}
                            className="mr-2"
                        />
                        <Button
                            type="submit"
                            label="Crear Proyecto"
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: '#2dabd2',
                                borderColor: '#2dabd2'
                            }}
                        />
                    </div>
                </div>
            </Card>

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
        </div>
    );
};

export default CreateProject; 