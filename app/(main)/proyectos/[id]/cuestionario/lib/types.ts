// Tipos base para estímulos
interface BaseStimulus {
    id: number;
    name: string;
}

interface SoundStimulus extends BaseStimulus {
    type: 'sonido';
    duration: string;
    frequency: string;
}

interface ColorStimulus extends BaseStimulus {
    type: 'color';
    hexCode: string;
    description: string;
}

interface VideoStimulus extends BaseStimulus {
    type: 'video';
    duration: string;
    format: string;
}

interface ImageStimulus extends BaseStimulus {
    type: 'imagen';
    format: string;
    resolution: string;
}

export type Stimulus = SoundStimulus | ColorStimulus | VideoStimulus | ImageStimulus;

export interface StepThreeData {
    selectedStimuli: Stimulus[];
    isRandomOrder: boolean;
}

export interface StepThreeProps {
    data?: StepThreeData;
    onDataChange: (data: StepThreeData) => void;
}

export interface StepFourData {
    estimatedTime: number; // tiempo en minutos
    startDate: Date | null;
    endDate: Date | null;
    isActive: boolean;
    isPaid: boolean;
}

export interface StepFourProps {
    data?: StepFourData;
    onDataChange: (data: StepFourData) => void;
    onFinish: () => void;
}

export interface FormComponent {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
}

export interface StepOneData {
    formComponents: FormComponent[];
}

export interface StepOneProps {
    data?: StepOneData;
    onDataChange: (data: StepOneData) => void;
}

export interface StepTwoData {
    totalSample: number;
    menCount: number;
    womenCount: number;
    ageRange: {
        min: string;
        max: string;
    };
}

export interface StepTwoProps {
    data?: StepTwoData;
    onDataChange: (data: StepTwoData) => void;
} 