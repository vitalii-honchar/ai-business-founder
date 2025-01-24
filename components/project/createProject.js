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

const addProject = async (router) => {
    const newProject = await createProject();
    console.log('newProject', newProject);
    if (newProject) {
        router.push(`/application/project/${newProject.id}`);
    }
};

export default addProject;