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

    async updateData(id, version, data) {
        const supabase = await createClient();

        const newVersion = version + 1;
        const updateData = {
            data,
            version: newVersion
        };

        const { data: actualVersion, error } = await supabase
            .from('projects')
            .update(updateData)
            .eq('id', id)
            .eq('version', version)
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