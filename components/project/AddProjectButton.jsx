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
            router.push(`/application/project/${newProject.id}`);
        }
    };

    return (
        <button
            onClick={handleAddProject}
            className="fixed bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Create new project"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </button>
    );
};

export default AddProjectButton;