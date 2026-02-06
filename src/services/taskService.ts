import apiClient from '../api/client';
import type { Task } from '../types/task';

export const getTasksByProjectId = async (projectId: number): Promise<Task[]> => {
    const response = await apiClient.get<any>(`/projects/${projectId}/tasks`);
    return response.data.content || response.data;
};

export const createTask = async (
    projectId: number,
    task: Omit<Task, 'id' | 'projectId' | 'status'>
): Promise<Task> => {
    const response = await apiClient.post<Task>(`/projects/${projectId}/tasks`, task);
    return response.data;
};

export const updateTaskStatus = async (
    taskId: number,
    status: string
): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${taskId}/status`, { status });
    return response.data;
};
