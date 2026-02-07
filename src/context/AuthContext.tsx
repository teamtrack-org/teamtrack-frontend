import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('mock_token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = () => {
        localStorage.setItem('mock_token', '1234567890');
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('mock_token');
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
