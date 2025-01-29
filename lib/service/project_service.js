import projectRepo from "@/lib/db/repository/project_repo";
import logger from '@/lib/logger';
import validationService from "./validation_service";

const createProjectService = () => {
    const getProject = async (userId, projectId) => {
        const project = await projectRepo.get(projectId);

        if (!project) {
            const error = new Error('Project not found');
            error.status = 404;
            throw error;
        }

        if (project.userId !== userId) {
            const error = new Error('Forbidden');
            error.status = 403;
            throw error;
        }
        return project;
    };

    const updateName = async (userId, projectId, request) => {
        const log = logger.child({ userId, projectId });
        log.info({ name: request?.name }, 'Updating project name');

        if (!request?.name) {
            throw new Error('Invalid name format');
        }

        await projectRepo.updateName(projectId, request.name);
        log.info({ name: request.name }, 'Project name updated successfully');
        return request.name;
    };

    const generateProjectValidation = async (userId, projectId, request) => 
        validationService.generateValidation(userId, projectId, request);

    return {
        getProject,
        updateName,
        generateProjectValidation
    };
};

export default createProjectService();