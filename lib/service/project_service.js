import { analyzeHww, analyzeTamSamSom, analyzeCompetitors, summarizeValidation, createName } from "@/lib/ai/ai";
import projectRepo from "@/lib/db/repository/project_repo";
import logger from '@/lib/logger';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Helper functions for project updates
async function retryProjectUpdate(projectId, updateFn) {
    let attempts = 0;
    while (attempts < MAX_RETRIES) {
        try {
            const project = await projectRepo.get(projectId);
            await updateFn(project);
            return project;
        } catch (error) {
            if (!shouldRetry(error, ++attempts)) {
                throw error;
            }
            await delay(RETRY_DELAY);
        }
    }
}

function shouldRetry(error, attempts) {
    return attempts < MAX_RETRIES && error.message?.includes('Version mismatch');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Validation analysis helpers
async function performInitialAnalysis(request) {
    return Promise.all([
        analyzeHww(request),
        analyzeTamSamSom(request),
        createName(request),
    ]);
}

async function saveValidationInput(projectId, request) {
    return retryProjectUpdate(projectId, async (project) => {
        project.data = project.data || { input: {}, analysis: { validation: {} } };
        project.data.input.validation = request;
        await projectRepo.updateProject(project);
    });
}

async function saveInitialResults(projectId, hww, tamSamSom, name) {
    return retryProjectUpdate(projectId, async (project) => {
        project.name = name;
        project.data.analysis.validation.hww = hww;
        project.data.analysis.validation.tamSamSom = tamSamSom;
        await projectRepo.updateProject(project);
    });
}

// Async validation processing
async function processAsyncValidation(userId, startTime, projectId, analysisData) {
    const log = logger.child({ userId, projectId });
    const asyncStartTime = Date.now();

    try {
        const { competitorAnalysis, summary } = await performAsyncAnalysis(analysisData);
        await saveAsyncResults(projectId, competitorAnalysis, summary);
        logTimings(log, asyncStartTime, startTime, 'completed');
    } catch (error) {
        logTimings(log, asyncStartTime, startTime, 'failed', error);
    }
}

async function performAsyncAnalysis(analysisData) {
    const competitorAnalysis = await analyzeCompetitors(analysisData);
    const summary = await summarizeValidation({
        competitorAnalysis,
        ...analysisData
    });
    return { competitorAnalysis, summary };
}

async function saveAsyncResults(projectId, competitorAnalysis, summary) {
    return retryProjectUpdate(projectId, async (project) => {
        project.data.analysis.validation.competitorAnalysis = competitorAnalysis;
        project.data.analysis.validation.summary = summary;
        await projectRepo.updateProject(project);
    });
}

function logTimings(log, asyncStartTime, fullStartTime, status, error = null) {
    const timings = {
        asyncDuration: Date.now() - asyncStartTime,
        fullDuration: Date.now() - fullStartTime
    };

    if (error) {
        log.error({ ...timings, error: error.message }, `Async validation analysis ${status}`);
    } else {
        log.info(timings, `Async validation analysis ${status}`);
    }
}

// Main service object
const projectService = {
    async updateName(userId, projectId, request) {
        const log = logger.child({ userId, projectId });
        log.info({ name: request?.name }, 'Updating project name');

        if (!request?.name) {
            throw new Error('Invalid name format');
        }

        await projectRepo.updateName(projectId, request.name);
        log.info({ name: request.name }, 'Project name updated successfully');
        return request.name;
    },

    async generateProjectValidation(userId, projectId, request) {
        const log = logger.child({ userId, projectId, request });
        const startTime = Date.now();

        if (!request || typeof request !== 'object') {
            throw new Error('Invalid validation request format');
        }

        try {
            await saveValidationInput(projectId, request);
            const [hww, tamSamSom, nameResponse] = await performInitialAnalysis(request);
            const updatedProject = await saveInitialResults(projectId, hww, tamSamSom, nameResponse.name);

            log.info({ syncDuration: Date.now() - startTime }, 'Sync part of validation completed');

            setTimeout(() => {
                processAsyncValidation(userId, startTime, projectId, {
                    userInput: request,
                    hww,
                    tamSamSom
                });
            }, 0);

            return updatedProject;
        } catch (error) {
            log.error({ error: error.message, duration: Date.now() - startTime }, 'Validation generation failed');
            throw error;
        }
    }
};

export default projectService;