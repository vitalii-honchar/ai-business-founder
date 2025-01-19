import { createClient } from "@/lib/db/dbServer";

const projectRepo = {
    async get(id) {
        const supabase = await createClient();

        const { data: project, error } = await supabase
            .from('projects')
            .select()
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching project:', error);
            throw error;
        }

        return project;
    },

    async getProjectsIdAndNames() {
        const supabase = await createClient();

        const { data: projects, error } = await supabase
            .from('projects')
            .select('id, name');

        if (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }

        return projects;
    },

    async updateName(id, name) {
        const supabase = await createClient();

        const { error } = await supabase
            .from('projects')
            .update({ name })
            .eq('id', id);

        if (error) {
            console.error('Error updating project name:', error);
            throw error;
        }
    },

    async updateProject(project) {
        const supabase = await createClient();

        const newVersion = project.version + 1;
        const updateData = {
            name: project.name,
            data: project.data,
            version: newVersion
        };

        const { data: actualVersion, error } = await supabase
            .from('projects')
            .update(updateData)
            .eq('id', project.id)
            .eq('version', project.version)
            .select('version')
            .single();

        if (error) {
            console.error('Error updating project:', error);
            throw error;
        }

        if (!actualVersion || actualVersion.version !== newVersion) {
            throw new Error('Project was modified by another transaction. Please refresh and try again.');
        }
    },
}

export default projectRepo;