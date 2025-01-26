import { analyzeHww, analyzeTamSamSom, analyzeCompetitors, summarizeValidation, createName } from "@/lib/ai/ai";
import projectRepo from "@/lib/db/repository/project_repo";
import logger from '@/lib/logger';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const validationTasks = {
    generateName: 'generate_name',
    analyzeHhww: 'analyze_hww',
    analyzeTamSamSom: 'analyze_tam_sam_som',
    analyzeCompetitors: 'analyze_competitors',
    generateSummary: 'generate_summary'
}

const defaultData = { input: {}, tasks: {}, analysis: { validation: {} } };

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

async function saveValidationInput(projectId, request) {
    return retryProjectUpdate(projectId, async (project) => {
        project.data = project.data || defaultData;
        project.data.input.validation = request;

        if (!project.data.tasks) {
            project.data.tasks = {};
        }

        project.data.tasks.validation = Object.values(validationTasks);
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
    const log = logger.child({ projectId });
    log.info('Saving competitor analysis and summary results');
    const result = await retryProjectUpdate(projectId, async (project) => {
        project.data.analysis.validation.competitorAnalysis = competitorAnalysis;
        project.data.analysis.validation.summary = summary;
        project.data.tasks.validation = project.data.tasks.validation
            .filter(task => task !== validationTasks.analyzeCompetitors 
                        && task !== validationTasks.generateSummary);
        await projectRepo.updateProject(project);
    });
    log.info('Competitor analysis and summary saved successfully');
    return result;
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
async function saveHwwResult(projectId, hww) {
    const log = logger.child({ projectId, analysis: 'hww' });
    log.info('Saving HWW analysis result');
    const result = await retryProjectUpdate(projectId, async (project) => {
        project.data.analysis.validation.hww = hww;
        project.data.tasks.validation = project.data.tasks.validation
            .filter(task => task !== validationTasks.analyzeHhww);
        await projectRepo.updateProject(project);
    });
    log.info('HWW analysis result saved successfully');
    return result;
}

async function saveTamSamSomResult(projectId, tamSamSom) {
    const log = logger.child({ projectId, analysis: 'tamSamSom' });
    log.info('Saving TAM SAM SOM analysis result');
    const result = await retryProjectUpdate(projectId, async (project) => {
        project.data.analysis.validation.tamSamSom = tamSamSom;
        project.data.tasks.validation = project.data.tasks.validation
            .filter(task => task !== validationTasks.analyzeTamSamSom);
        await projectRepo.updateProject(project);
    });
    log.info('TAM SAM SOM analysis result saved successfully');
    return result;
}

async function saveProjectName(projectId, name) {
    const log = logger.child({ projectId, analysis: 'name' });
    log.info({ name }, 'Saving generated project name');
    const result = await retryProjectUpdate(projectId, async (project) => {
        project.name = name;
        project.data.tasks.validation = project.data.tasks.validation
            .filter(task => task !== validationTasks.generateName);
        await projectRepo.updateProject(project);
    });
    log.info({ name }, 'Project name saved successfully');
    return result;
}

async function processInitialAnalysis(userId, projectId, request) {
    const log = logger.child({ userId, projectId });
    const startTime = Date.now();

    try {
        log.info('Starting parallel analysis execution');

        const hwwPromise = analyzeHww(request)
            .then(async hww => {
                log.info({ analysisType: 'hww' }, 'HWW analysis completed');
                await saveHwwResult(projectId, hww);
                return hww;
            });

        const tamSamSomPromise = analyzeTamSamSom(request)
            .then(async tamSamSom => {
                log.info({ analysisType: 'tamSamSom' }, 'TAM SAM SOM analysis completed');
                await saveTamSamSomResult(projectId, tamSamSom);
                return tamSamSom;
            });

        const namePromise = createName(request)
            .then(async nameResponse => {
                log.info({ analysisType: 'name' }, 'Name generation completed');
                await saveProjectName(projectId, nameResponse.name);
                return nameResponse;
            });

        const [hww, tamSamSom, nameResponse] = await Promise.all([
            hwwPromise,
            tamSamSomPromise,
            namePromise
        ]);

        log.info({
            duration: Date.now() - startTime,
            analyses: ['hww', 'tamSamSom', 'name']
        }, 'All initial analyses completed and saved');

        return { hww, tamSamSom, name: nameResponse.name };
    } catch (error) {
        log.error({
            error: error.message,
            duration: Date.now() - startTime
        }, 'Initial analysis failed');
        throw error;
    }
}

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

            // Start initial analysis asynchronously
            setTimeout(() => {
                processInitialAnalysis(userId, projectId, request)
                    .then(({ hww, tamSamSom }) => {
                        processAsyncValidation(userId, startTime, projectId, {
                            userInput: request,
                            hww,
                            tamSamSom
                        });
                    })
                    .catch(error => {
                        log.error({ error: error.message }, 'Initial analysis failed in async context');
                    });
            }, 0);

            const project = await projectRepo.get(projectId);
            return project;

        } catch (error) {
            log.error({ error: error.message, duration: Date.now() - startTime }, 'Validation generation failed');
            throw error;
        }
    }
};

export default projectService;