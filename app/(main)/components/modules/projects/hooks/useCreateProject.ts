import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProjectFormData, IStimulus, ProjectStatus } from '../types/project.types';
import { mockStimuli } from '../mocks/data';

export const useCreateProject = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<IProjectFormData>({
        name: '',
        description: '',
        status: 'active',
        logo: null
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [stimuli, setStimuli] = useState<IStimulus[]>(mockStimuli);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusChange = (e: { value: ProjectStatus }) => {
        setFormData(prev => ({
            ...prev,
            status: e.value
        }));
    };

    const handleImageChange = (file: File) => {
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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // TODO: Implementar la lógica de creación del proyecto
            console.log('Datos del formulario:', {
                ...formData,
                stimuli
            });
            router.push('/proyectos');
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        previewImage,
        stimuli,
        isLoading,
        handleInputChange,
        handleStatusChange,
        handleImageChange,
        handleSubmit,
        setStimuli
    };
}; 