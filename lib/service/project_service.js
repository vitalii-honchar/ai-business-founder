import projectRepo from "@/lib/db/repository/project_repo";
import logger, { loggerWithProjectId } from '@/lib/logger';
import validationService from "./validation_service";

const NEW_PROJECT_NAME = 'New Project';

const createProjectService = () => {
    const getProject = async (userId, projectId) => {
        const project = await projectRepo.get(projectId);

        if (!project) {
            const error = new Error('Project not found');
            error.status = 404;
            throw error;
        }

        if (!project.data?.access?.accessByLink) {
            if (project.userId !== userId) {
                const error = new Error('Forbidden');
                error.status = 403;
                throw error;
            }
        }
        return project;
    };

    const updateName = async (userId, projectId, request) => {
        const log = loggerWithProjectId(userId, projectId);
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

    const createProject = async () => await projectRepo.createProject(NEW_PROJECT_NAME);

    const updateAccess = async (userId, projectId, access) => {
        const log = loggerWithProjectId(userId, projectId).child({ access });
        log.info('Updating project access');

        if (!access || typeof access !== 'object') {
            throw new Error('Invalid access format');
        }

        const project = await getProject(userId, projectId);
        project.data = project.data || {};
        project.data.access = access;

        await projectRepo.updateProject(project);
        log.info('Project access updated successfully');
        return access;
    };

    return {
        getProject,
        updateName,
        generateProjectValidation,
        createProject,
        updateAccess,
    };
};

export default createProjectService();