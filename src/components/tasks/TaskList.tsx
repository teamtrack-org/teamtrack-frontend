import React, { useEffect, useState, useCallback } from 'react';
import { getTasksByProjectId, updateTaskStatus } from '../../services/taskService';
import type { Task } from '../../types/task';
import CreateTaskForm from './CreateTaskForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';

interface TaskListProps {
    projectId: number;
}

const TaskList: React.FC<TaskListProps> = ({ projectId }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getTasksByProjectId(projectId);
            setTasks(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch tasks.');
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleStatusChange = async (taskId: number, newStatus: string) => {
        try {
            await updateTaskStatus(taskId, newStatus);
            // Optimistic update or refetch
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                )
            );
        } catch (err) {
            console.error(err);
            alert('Failed to update task status');
        }
    };

    if (loading && tasks.length === 0) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <CreateTaskForm projectId={projectId} onTaskCreated={fetchTasks} />
            </div>

            {tasks.length === 0 ? (
                <EmptyState message="No tasks found for this project." />
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            style={{
                                border: '1px solid #eee',
                                padding: '1rem',
                                marginBottom: '0.5rem',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <strong style={{ fontSize: '1.1rem' }}>{task.title}</strong>
                                <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#666' }}>
                                    {task.description}
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    aria-label={`Change status for task: ${task.title}`}
                                    style={{
                                        padding: '0.3rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        backgroundColor: '#f8f9fa'
                                    }}
                                >
                                    <option value="TODO">To Do</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
