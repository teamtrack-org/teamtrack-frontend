import apiClient from '../api/client';
import type { LoginRequest } from '../types/auth'; // Reusing LoginRequest type for now as it has username/password

export const verifyCredentials = async (authHeader: string): Promise<boolean> => {
    try {
        // We try to access a protected resource to verify the credentials.
        // Using /projects as a verification endpoint since it requires auth.
        await apiClient.get('/projects', {
            headers: { Authorization: authHeader }
        });
        return true;
    } catch (error) {
        console.error('Credential verification failed', error);
        return false;
    }
};

export const registerUser = async (credentials: LoginRequest): Promise<void> => {
    await apiClient.post('/auth/register', {
        email: credentials.username, // mapping username to email for backend
        password: credentials.password
    });
};
