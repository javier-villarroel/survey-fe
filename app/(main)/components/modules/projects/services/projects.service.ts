import api from '@/app/api/axios';
import { IProject, IProjectsListRequest, IProjectsListResponse, ICreateProjectRequest } from '../types/project.types';

const BASE_URL = '/projects';

export const getProjects = async (params: IProjectsListRequest = {}): Promise<IProjectsListResponse> => {
    const { data } = await api.get<IProjectsListResponse>(BASE_URL, { params });
    return data;
};

export const getProjectById = async (id: string): Promise<IProject> => {
    const { data } = await api.get<IProject>(`${BASE_URL}/${id}`);
    return data;
};

export const createProject = async (project: ICreateProjectRequest): Promise<IProject> => {
    const { data } = await api.post<IProject>(BASE_URL, project);
    return data;
};

export const updateProject = async (id: string, project: Partial<ICreateProjectRequest>): Promise<IProject> => {
    const { data } = await api.put<IProject>(`${BASE_URL}/${id}`, project);
    return data;
};

export const deleteProject = async (id: string): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
};

export const toggleProjectStatus = async (id: string): Promise<IProject> => {
    const { data } = await api.patch<IProject>(`${BASE_URL}/${id}/toggle-status`);
    return data;
}; 