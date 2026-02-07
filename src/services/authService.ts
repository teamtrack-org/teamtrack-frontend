import apiClient from '../api/client';
import type { LoginRequest, LoginResponse } from '../types/auth';

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Note: Backend endpoint might differ. Assuming /auth/login or similar.
    // Based on previous context, user might be using Basic Auth or a custom endpoint.
    // Let's assume a standard POST /auth/login for now, or check backend code if available.
    // Wait, backend has User entity but I don't recall seeing an explicit AuthController.
    // I will check backend code in next step to be sure. For now standard structure.
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
};
