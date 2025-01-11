import { createClient } from '@/lib/db/dbServer';

export const getProjects = async () => {
  const supabase = await createClient();
  const { data: projects, error } = await supabase.from('projects').select();
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return projects;
};

export const createProject = async () => {
  const supabase = await createClient();
  const { data: newProject, error } = await supabase
    .from('projects')
    .insert([{ name: 'New Project' }])
    .single();

  if (error) {
    console.error('Error creating project:', error);
    return null;
  }

  return newProject;
};