import { createClient } from '@/lib/db/dbClient';
import projecApi from '@/lib/client/api/project_api';

const addProject = async (router) => {
    const newProject = await projecApi.createProject();
    if (newProject) {
        router.push(`/application/project/${newProject.id}`);
    }
};

export default addProject;