import { STIMULUS_TEMPLATE_HEADERS, StimulusImport, Stimulus } from './types';
import * as XLSX from 'xlsx';

export const generateTemplateFile = () => {
    const ws = XLSX.utils.json_to_sheet([{}], {
        header: STIMULUS_TEMPLATE_HEADERS.map(h => h.header)
    });

    // Agregar validaciones y comentarios
    ws['!cols'] = STIMULUS_TEMPLATE_HEADERS.map(() => ({ wch: 20 }));
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estímulos');
    
    // Generar el archivo
    XLSX.writeFile(wb, 'plantilla_estimulos.xlsx');
};

export const processImportedFile = async (file: File): Promise<StimulusImport[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                
                // Mapear los datos al formato esperado
                const stimuli: StimulusImport[] = jsonData.map((row: any) => ({
                    name: row['Nombre del Estímulo'],
                    type: row['Tipo (color/sound/video/image)'].toLowerCase(),
                    value: row['Valor (código hex para colores)'] || '',
                    filePath: row['Ruta del Archivo (para sound/video/image)'] || ''
                }));
                
                resolve(stimuli);
            } catch (error) {
                reject(new Error('Error al procesar el archivo: ' + error));
            }
        };
        
        reader.onerror = () => {
            reject(new Error('Error al leer el archivo'));
        };
        
        reader.readAsArrayBuffer(file);
    });
};

export const validateStimulus = (stimulus: StimulusImport): string[] => {
    const errors: string[] = [];
    
    if (!stimulus.name) {
        errors.push('El nombre es requerido');
    }
    
    if (!['color', 'sound', 'video', 'image'].includes(stimulus.type)) {
        errors.push('Tipo de estímulo inválido');
    }
    
    if (stimulus.type === 'color') {
        if (!stimulus.value || !/^#[0-9A-F]{6}$/i.test(stimulus.value)) {
            errors.push('El código de color debe ser un valor hexadecimal válido (ej: #FF0000)');
        }
    } else {
        if (!stimulus.filePath) {
            errors.push('La ruta del archivo es requerida para este tipo de estímulo');
        }
    }
    
    return errors;
};

export const processFile = async (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsArrayBuffer(file);
    });
};

export const convertImportToStimulus = async (
    importData: StimulusImport,
    file?: File
): Promise<Stimulus> => {
    let value = importData.value;
    let size: number | undefined;
    let duration: number | undefined;

    if (file) {
        const arrayBuffer = await processFile(file);
        size = arrayBuffer.byteLength;
        
        if (importData.type === 'video' || importData.type === 'sound') {
            // Aquí se podría agregar lógica para obtener la duración del archivo
            // Por ahora lo dejamos undefined
        }
        
        // Convertir el archivo a base64 para preview
        const base64 = btoa(
            new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        value = `data:${file.type};base64,${base64}`;
    }

    return {
        id: Date.now().toString(),
        type: importData.type,
        name: importData.name,
        value,
        size,
        duration,
        createdAt: new Date().toISOString()
    };
}; 