import apiClient from '../api/client';
import type { Project } from '../types/project';

export const getProjects = async (): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
};

export const createProject = async (
    project: Omit<Project, 'id'>
): Promise<Project> => {
    const response = await apiClient.post<Project>('/projects', project);
    return response.data;
};
