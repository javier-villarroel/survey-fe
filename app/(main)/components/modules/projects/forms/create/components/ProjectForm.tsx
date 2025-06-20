'use client';

import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { IProjectFormData, ProjectStatus } from '../../../types/project.types';
import { projectStatuses } from '../../../mocks/data';

interface ProjectFormProps {
    formData: IProjectFormData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onStatusChange: (e: { value: ProjectStatus }) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ 
    formData, 
    onInputChange, 
    onStatusChange 
}) => {
    return (
        <div className="card" style={{ minHeight: '340px' }}>
            <h5>Información del Proyecto</h5>
            <div className="grid formgrid p-fluid">
                <div className="field col-12">
                    <label htmlFor="name" className="font-medium">
                        Nombre del Proyecto
                    </label>
                    <InputText
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={onInputChange}
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
                        onChange={onInputChange}
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
                        onChange={onStatusChange}
                    />
                </div>
            </div>
        </div>
    );
}; 