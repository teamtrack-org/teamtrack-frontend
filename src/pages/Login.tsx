import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock validation
        if (username && password) {
            login();
            navigate('/');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f3f4f6'
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    padding: '2rem',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '400px'
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1f2937' }}>Login to TeamTrack</h2>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            boxSizing: 'border-box'
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            boxSizing: 'border-box'
                        }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;
