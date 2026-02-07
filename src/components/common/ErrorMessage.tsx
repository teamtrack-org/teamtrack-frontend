import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            color: '#b91c1c',
            marginBottom: '1rem',
            textAlign: 'center'
        }}>
            <p style={{ margin: 0 }}>{message}</p>
        </div>
    );
};

export default ErrorMessage;
