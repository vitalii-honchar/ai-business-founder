import { createClient } from '@/lib/db/dbClient';
import projecApi from '@/lib/client/api/project_api';

const addProject = async (router) => {
    try {
        const newProject = await projecApi.createProject();
        if (newProject) {
            router.push(`/application/project/${newProject.id}`);
        }
    } catch (error) {
        throw error; // Let the calling component handle the error
    }
};

export default addProject;