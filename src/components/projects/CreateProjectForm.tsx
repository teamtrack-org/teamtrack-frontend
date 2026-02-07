import React, { useState } from 'react';
import type { Project } from '../../types/project';
import { createProject } from '../../services/projectService';

interface CreateProjectFormProps {
    onProjectCreated: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
    onProjectCreated,
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const newProject: Omit<Project, 'id'> = {
            name,
            description,
        };

        try {
            await createProject(newProject);
            setName('');
            setDescription('');
            onProjectCreated();
        } catch (err: any) {
            console.error('Project creation error:', err);
            let errorMessage = 'Failed to create project.';

            if (err.response) {
                // Server responded with an error
                if (err.response.data) {
                    if (typeof err.response.data === 'string') {
                        errorMessage = err.response.data;
                    } else if (err.response.data.message) {
                        errorMessage = err.response.data.message;
                    } else if (err.response.data.errors) {
                        // Validation errors
                        errorMessage = Object.values(err.response.data.errors).join(', ');
                    }
                }
                errorMessage = `Error ${err.response.status}: ${errorMessage}`;
            } else if (err.request) {
                errorMessage = 'No response from server. Please check if the backend is running.';
            } else {
                errorMessage = err.message || 'An unexpected error occurred.';
            }

            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                marginBottom: '2rem',
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <h3>Create New Project</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ marginBottom: '1rem' }}>
                <label
                    htmlFor="name"
                    style={{ display: 'block', marginBottom: '0.5rem' }}
                >
                    Project Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    aria-required="true"
                    style={{ width: '100%', padding: '0.5rem' }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label
                    htmlFor="description"
                    style={{ display: 'block', marginBottom: '0.5rem' }}
                >
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    aria-required="true"
                    style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }}
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
            >
                {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
        </form>
    );
};

export default CreateProjectForm;
