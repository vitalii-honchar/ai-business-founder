import projectRepo from "@/lib/db/repository/project_repo";
import logger, { loggerWithProjectId } from '@/lib/logger';
import userProfileService from "@/lib/service/user_profile_service";
import validationService from "./validation_service";
import { SubscriptionStatus, PlanLimits, SubscriptionError } from "@/lib/domain/user_profile";
const NEW_PROJECT_NAME = 'New Project';
const PROJECT_EMPTY_DATA = { input: {}, tasks: {}, access: {}, analysis: { validation: {} } };

const forbiddenError = (message) => {
    const error = new Error(message);
    error.status = 403; 
    return error;
};

const createProjectService = () => {
    const validateOwnership = async (userId, projectId) => {
        const project = await projectRepo.get(projectId);
        if (project.user_id !== userId) {
            throw forbiddenError('Forbidden');
        }
        return project;
    };

    const getProject = async (userId, projectId) => {
        const project = await projectRepo.get(projectId);

        if (!project) {
            const error = new Error('Project not found');
            error.status = 404;
            throw error;
        }

        if (!project.data?.access?.accessByLink) {
            if (project.user_id !== userId) {
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

        await validateOwnership(userId, projectId);

        if (!request?.name) {
            throw new Error('Invalid name format');
        }

        await projectRepo.updateName(projectId, request.name);
        log.info({ name: request.name }, 'Project name updated successfully');
        return request.name;
    };

    const generateProjectValidation = async (userId, projectId, request) => {
        await validateOwnership(userId, projectId);
        return validationService.generateValidation(userId, projectId, request);
    };

    
    const createProject = async (userId) => {
        const userProfile = await userProfileService.getUserProfile(userId);
        if (userProfile.subscriptionStatus !== SubscriptionStatus.ACTIVE) {
            throw new SubscriptionError('Subscription not active');
        }
        if (userProfile.usage.maxProjects >= PlanLimits[userProfile.subscriptionPlan].maxProjects) {
            throw new SubscriptionError(`Max projects reached. Your ${userProfile.subscriptionPlan} plan allows ${PlanLimits[userProfile.subscriptionPlan].maxProjects} projects.`);
        }

        const project = await projectRepo.createProject(NEW_PROJECT_NAME, PROJECT_EMPTY_DATA);
        
        userProfile.usage.maxProjects++;
        await userProfileService.updateUserProfile(userProfile);

        return project;
    }

    const updateAccess = async (userId, projectId, access) => {
        const log = loggerWithProjectId(userId, projectId).child({ access });
        log.info('Updating project access');

        if (!access || typeof access !== 'object') {
            throw new Error('Invalid access format');
        }

        const project = await validateOwnership(userId, projectId);

        project.data = project.data || PROJECT_EMPTY_DATA;
        project.data.access = access;

        await projectRepo.updateProject(project);
        log.info('Project access updated successfully');
        return access;
    };

    const deleteProject = async (userId, projectId) => {
        const project = await projectRepo.get(projectId);

        if (!project) {
            const error = new Error('Project not found');
            error.status = 404;
            throw error;
        }

        if (project.user_id !== userId) {
            throw forbiddenError('Forbidden');
        }

        await projectRepo.deleteProject(projectId);
    };

    return {
        getProject,
        updateName,
        generateProjectValidation,
        createProject,
        updateAccess,
        deleteProject,
    };
};

export default createProjectService();