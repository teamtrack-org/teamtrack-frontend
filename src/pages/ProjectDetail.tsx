import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/projectService';
import type { Project } from '../types/project';
import TaskList from '../components/tasks/TaskList';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const data = await getProjectById(Number(id));
                setProject(data);
            } catch (err) {
                setError('Failed to fetch project details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) return <div>Loading project details...</div>;
    if (error) return <div>{error}</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <Link to="/projects" style={{ textDecoration: 'none', color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>
                &larr; Back to Projects
            </Link>
            <h1>{project.name}</h1>
            <p style={{ fontSize: '1.2rem', color: '#555' }}>{project.description}</p>

            <hr style={{ margin: '2rem 0' }} />

            <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <h2>Tasks</h2>
                <TaskList projectId={project.id} />
            </div>
        </div>
    );
};

export default ProjectDetail;
