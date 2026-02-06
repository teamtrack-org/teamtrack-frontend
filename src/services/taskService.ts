import apiClient from '../api/client';
import type { Task } from '../types/task';

export const getTasksByProjectId = async (projectId: number): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>(`/projects/${projectId}/tasks`);
    return response.data;
};
