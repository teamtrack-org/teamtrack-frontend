import React, { useEffect, useState } from 'react';
import { getTasksByProjectId } from '../../services/taskService';
import type { Task } from '../../types/task';

interface TaskListProps {
    projectId: number;
}

const TaskList: React.FC<TaskListProps> = ({ projectId }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasksByProjectId(projectId);
                setTasks(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch tasks.');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [projectId]);

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {tasks.length === 0 ? (
                <p>No tasks found for this project.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            style={{
                                border: '1px solid #eee',
                                padding: '0.5rem',
                                marginBottom: '0.5rem',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <strong>{task.title}</strong>
                                <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#666' }}>
                                    {task.description}
                                </p>
                            </div>
                            <span
                                style={{
                                    fontSize: '0.8rem',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '12px',
                                    backgroundColor: '#e0f2fe',
                                    color: '#0369a1',
                                }}
                            >
                                {task.status}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
