import { supabase } from '@/lib/db/db';

export async function getProjectsByUserId(userId) {
    const { data: projects, error } = await supabase
        .from('projects')
        .select('id, name')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return projects;
}