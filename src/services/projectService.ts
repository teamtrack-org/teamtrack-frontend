import apiClient from '../api/client';
import { Project } from '../types/project';

export const getProjects = async (): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
};
