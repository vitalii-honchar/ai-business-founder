'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/db/dbClient';

const createProject = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('projects')
        .insert([{ name: 'New Project' }])
        .select()
        .single();

    if (error) {
        console.error('Error creating project:', error);
        return null;
    }

    return data;
};

const AddProjectButton = () => {
    const router = useRouter();

    const handleAddProject = async () => {
        const newProject = await createProject();
        console.log('newProject', newProject);
        if (newProject) {
            router.push(`/app/project/${newProject.id}`);
        }
    };

    return (
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddProject}
        >
            ➕ Add Project
        </button>
    );
};

export default AddProjectButton;