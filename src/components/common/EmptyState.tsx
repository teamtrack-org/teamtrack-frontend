import React from 'react';

interface EmptyStateProps {
    message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
    return (
        <div style={{
            padding: '3rem',
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px dashed #d1d5db',
            color: '#6b7280'
        }}>
            <p style={{ fontSize: '1.1rem', margin: 0 }}>{message}</p>
        </div>
    );
};

export default EmptyState;
