import React, { useState } from 'react';
import { createTask } from '../../services/taskService';

interface CreateTaskFormProps {
    projectId: number;
    onTaskCreated: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
    projectId,
    onTaskCreated,
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await createTask(projectId, { title, description });
            setTitle('');
            setDescription('');
            onTaskCreated();
        } catch (err) {
            console.error(err);
            setError('Failed to create task.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                marginTop: '1rem',
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
            }}
        >
            <h4>Add New Task</h4>
            {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
            <div style={{ marginBottom: '0.5rem' }}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', minHeight: '60px' }}
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                style={{
                    padding: '0.4rem 0.8rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem',
                }}
            >
                {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
};

export default CreateTaskForm;
