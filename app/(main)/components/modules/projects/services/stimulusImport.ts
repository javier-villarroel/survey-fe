import { IStimulus, IStimulusImport, StimulusType } from '../types/project.types';
import * as XLSX from 'xlsx';

export const generateTemplateFile = () => {
    const template = [
        {
            name: 'Ejemplo Color',
            type: 'color',
            value: '#FF0000'
        },
        {
            name: 'Ejemplo Sonido',
            type: 'sound',
            value: 'Nombre del archivo de audio'
        },
        {
            name: 'Ejemplo Video',
            type: 'video',
            value: 'Nombre del archivo de video'
        },
        {
            name: 'Ejemplo Imagen',
            type: 'image',
            value: 'Nombre del archivo de imagen'
        }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estímulos');
    XLSX.writeFile(wb, 'plantilla_estimulos.xlsx');
};

export const processImportedFile = async (file: File): Promise<IStimulusImport[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                const stimuli: IStimulusImport[] = jsonData.map((row: any) => ({
                    name: row.name,
                    type: row.type as StimulusType,
                    value: row.value
                }));

                resolve(stimuli);
            } catch (error) {
                reject(new Error('Error al procesar el archivo'));
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsBinaryString(file);
    });
};

export const validateStimulus = (stimulus: IStimulusImport): string[] => {
    const errors: string[] = [];

    if (!stimulus.name) {
        errors.push('El nombre es requerido');
    }

    if (!stimulus.type) {
        errors.push('El tipo es requerido');
    } else if (!['color', 'sound', 'video', 'image'].includes(stimulus.type)) {
        errors.push('Tipo de estímulo no válido');
    }

    if (!stimulus.value) {
        errors.push('El valor es requerido');
    } else if (stimulus.type === 'color' && !/^#[0-9A-F]{6}$/i.test(stimulus.value)) {
        errors.push('El valor del color debe ser un código hexadecimal válido (ej: #FF0000)');
    }

    return errors;
};

export const convertImportToStimulus = async (
    importData: IStimulusImport,
    file?: File
): Promise<IStimulus> => {
    let value = importData.value;
    let size: number | undefined;

    if (file) {
        size = file.size;
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
        value = reader.result as string;
    }

    return {
        id: Date.now().toString(),
        type: importData.type,
        name: importData.name,
        value,
        size,
        createdAt: new Date().toISOString()
    };
}; 