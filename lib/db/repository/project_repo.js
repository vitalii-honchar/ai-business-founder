import { createClient } from "@/lib/db/dbServer";
import logger from "@/lib/logger";

const projectRepo = {
    async get(id) {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        const { data: project, error } = await supabase
            .from('projects')
            .select()
            .eq('id', id)
            .single();

        if (error) {
            logger.error({ userId: user.id, projectId: id, error }, 'Error fetching project');
            throw error;
        }

        logger.info({ userId: user.id, projectId: id }, 'Project fetched successfully');
        return project;
    },

    async getProjectsIdAndNames() {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        const { data: projects, error } = await supabase
            .from('projects')
            .select('id, name, data')
            .order('updated_at', { ascending: false });

        if (error) {
            logger.error({ userId: user.id, error }, 'Error fetching projects');
            throw error;
        }

        logger.info({ userId: user.id, count: projects.length }, 'Projects fetched successfully');
        return projects;
    },

    async updateName(id, name) {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('projects')
            .update({ name })
            .eq('id', id);

        if (error) {
            logger.error({ userId: user.id, projectId: id, error }, 'Error updating project name');
            throw error;
        }

        logger.info({ userId: user.id, projectId: id, newName: name }, 'Project name updated successfully');
    },

    async updateProject(project) {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        const newVersion = project.version + 1;
        const updateData = {
            name: project.name,
            data: project.data,
            updated_at: new Date(),
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
            logger.error({ userId: user.id, projectId: project.id, error }, 'Error updating project');
            throw error;
        }

        if (!actualVersion || actualVersion.version !== newVersion) {
            logger.error({
                userId: user.id,
                projectId: project.id,
                expectedVersion: newVersion,
                actualVersion: actualVersion?.version
            }, 'Version mismatch detected');
            throw new Error('Project was modified by another transaction. Please refresh and try again.');
        }

        logger.info({ userId: user.id, projectId: project.id, newVersion }, 'Project updated successfully');
    },
}

export default projectRepo;