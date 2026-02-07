import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { verifyCredentials } from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        const token = 'Basic ' + btoa(username + ':' + password);

        const isValid = await verifyCredentials(token);

        if (isValid) {
            localStorage.setItem('auth_token', token);
            setIsAuthenticated(true);
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
