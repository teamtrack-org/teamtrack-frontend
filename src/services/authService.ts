import apiClient from '../api/client';

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
