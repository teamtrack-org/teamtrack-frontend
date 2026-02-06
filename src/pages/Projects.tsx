import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/projectService';
import type { Project } from '../types/project';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (err) {
                setError('Failed to fetch projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Projects</h1>
            {projects.length === 0 ? (
                <p>No projects found.</p>
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
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Projects;
