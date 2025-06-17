export type ProjectStatus = 'active' | 'inactive' | 'completed';

export interface IProjectFormData {
    name: string;
    description: string;
    status: ProjectStatus;
    logo: string | null;
}

export interface IProject extends IProjectFormData {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateProjectRequest extends IProjectFormData {
    stimuli: IStimulus[];
}

export type StimulusType = 'color' | 'sound' | 'video' | 'image';

export interface IStimulus {
    id: string;
    type: StimulusType;
    name: string;
    value: string;
    size?: number;
    duration?: number;
    createdAt: string;
}

export interface IStimulusImport {
    name: string;
    type: StimulusType;
    value: string;
}

export interface IImportError {
    [key: string]: string[];
}

export interface IPagination {
    page: number;
    perPage: number;
    count: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface IDateFilter {
    startDate?: string;
    endDate?: string;
}

export interface IProjectsFilter extends IDateFilter {
    search?: string;
    status?: ProjectStatus;
}

export interface IProjectsListResponse {
    data: IProject[];
    pagination: IPagination & Partial<IDateFilter>;
}

export interface IProjectsListRequest extends IProjectsFilter {
    page?: number;
    perPage?: number;
} 