import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import type { Project } from '../types/project';
import CreateProjectForm from '../components/projects/CreateProjectForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProjects();
            setProjects(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch projects');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (loading && projects.length === 0) return <LoadingSpinner />;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Projects</h1>

            <CreateProjectForm onProjectCreated={fetchProjects} />

            {error && <ErrorMessage message={error} />}

            {projects.length === 0 && !loading ? (
                <EmptyState message="No projects found. Create one above!" />
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '1rem',
                                marginBottom: '1rem',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            <h3>
                                <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                                    {project.name}
                                </Link>
                            </h3>
                            <p>{project.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Projects;
