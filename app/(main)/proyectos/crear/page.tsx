'use client';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useCreateProject } from '@/app/(main)/components/modules/projects/hooks/useCreateProject';
import { ProjectLogo } from '@/app/(main)/components/modules/projects/forms/create/components/ProjectLogo';
import { ProjectForm } from '@/app/(main)/components/modules/projects/forms/create/components/ProjectForm';
import { StimuliManager } from '@/app/(main)/components/modules/projects/forms/create/components/StimuliManager';

const CreateProject = () => {
    const {
        formData,
        previewImage,
        stimuli,
        isLoading,
        handleInputChange,
        handleStatusChange,
        handleImageChange,
        handleSubmit,
        setStimuli
    } = useCreateProject();

    return (
        <div className="w-full overflow-x-hidden">
            <Card>
                <div className="flex align-items-center justify-content-between mb-4">
                    <h5 className="m-0">Crear Proyecto</h5>
                </div>
                <form onSubmit={handleSubmit} className="grid">
                    <div className="col-12 lg:col-4">
                        <ProjectLogo 
                            previewImage={previewImage}
                            onImageChange={handleImageChange}
                        />
                    </div>
                    <div className="col-12 lg:col-8">
                        <ProjectForm 
                            formData={formData}
                            onInputChange={handleInputChange}
                            onStatusChange={handleStatusChange}
                        />
                    </div>

                    <div className="col-12">
                        <StimuliManager 
                            stimuli={stimuli}
                            setStimuli={setStimuli}
                        />
                    </div>

                    <div className="col-12 flex justify-content-end mt-4">
                        <Button
                            type="button"
                            label="Cancelar"
                            severity="secondary"
                            outlined
                            onClick={() => window.history.back()}
                            className="mr-2"
                        />
                        <Button
                            type="submit"
                            label="Crear Proyecto"
                            loading={isLoading}
                            style={{
                                backgroundColor: '#000e28',
                                borderColor: '#000e28'
                            }}
                        />
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateProject; 