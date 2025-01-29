import { analyzeHww, analyzeTamSamSom, analyzeCompetitors, summarizeValidation, createName } from "@/lib/ai/ai";
import projectUpdateService from "@/lib/service/project_update_service";
import projectRepo from "@/lib/db/repository/project_repo";
import { withDuration, loggerWithProjectId } from '@/lib/logger';

const validationTasks = {
    generateName: 'generate_name',
    analyzeHhww: 'analyze_hww',
    analyzeTamSamSom: 'analyze_tam_sam_som',
    analyzeCompetitors: 'analyze_competitors',
    generateSummary: 'generate_summary'
};

const defaultData = { input: {}, tasks: {}, analysis: { validation: {} } };

const completeTask = (project, task) => project.data.tasks.validation
    .filter(it => it !== task);

// HWW Task
const analyzeAndSaveHww = async (log, projectId, request) => {
    const startTime = Date.now();
    const hww = await analyzeHww(request);

    withDuration(log, startTime).info('HWW analysis completed');

    await projectUpdateService.updateProject(projectId, async (project) => {
        project.data.analysis.validation.hww = hww;
        project.data.tasks.validation = completeTask(project, validationTasks.analyzeHhww);
    });

    return hww;
};

// TAM SAM SOM Task
const analyzeAndSaveTamSamSom = async (log, projectId, request) => {
    const startTime = Date.now();
    const tamSamSom = await analyzeTamSamSom(request);

    withDuration(log, startTime).info('TAM SAM SOM analysis completed');

    await projectUpdateService.updateProject(projectId, async (project) => {
        project.data.analysis.validation.tamSamSom = tamSamSom;
        project.data.tasks.validation = completeTask(project, validationTasks.analyzeTamSamSom);
    });

    return tamSamSom;
};

// Name Generation Task
const generateAndSaveName = async (log, projectId, request) => {
    const startTime = Date.now();
    const nameResponse = await createName(request);

    withDuration(log, startTime).info('Name generation completed');

    await projectUpdateService.updateProject(projectId, async (project) => {
        project.name = nameResponse.name;
        project.data.tasks.validation = completeTask(project, validationTasks.generateName);
    });

    return nameResponse.name;
};

// Analyze Competitors
const generateAnalyzeCompetitors = async (log, projectId, analysisData) => {
    const startTime = Date.now();
    const competitorAnalysis = await analyzeCompetitors(analysisData);

    withDuration(log, startTime).info('Competitor analysis completed');

    await projectUpdateService.updateProject(projectId, async (project) => {
        project.data.analysis.validation.competitorAnalysis = competitorAnalysis;
        project.data.tasks.validation = completeTask(project, validationTasks.analyzeCompetitors);
    });

    return competitorAnalysis;
};

// Generate Summary
const generateSummary = async (log, projectId, analysisData) => {
    const startTime = Date.now();
    const summary = await summarizeValidation(analysisData);

    withDuration(log, startTime).info('Summary generation completed');

    await projectUpdateService.updateProject(projectId, async (project) => {
        project.data.analysis.validation.summary = summary;
        project.data.tasks.validation = completeTask(project, validationTasks.generateSummary);
    });

    return summary;
};

const createValidationService = () => {

    const saveValidationInput = async (projectId, request) =>
        projectUpdateService.updateProject(projectId, async (project) => {
            project.data = project.data || defaultData;
            project.data.input.validation = request;
            project.data.tasks = project.data.tasks || {};
            project.data.analysis.validation = {};
            project.data.tasks.validation = Object.values(validationTasks);
        });

    const processInitialAnalysis = async (log, projectId, request) => {
        const [hww, tamSamSom, name] = await Promise.all([
            analyzeAndSaveHww(log, projectId, request),
            analyzeAndSaveTamSamSom(log, projectId, request),
            generateAndSaveName(log, projectId, request)
        ]);
        return { hww, tamSamSom, name };
    };

    const processAsyncValidation = async (log, projectId, analysisData) => {
        const competitorAnalysis = await generateAnalyzeCompetitors(log, projectId, analysisData);
        await generateSummary(log, projectId, {
            competitorAnalysis,
            ...analysisData
        });
    };

    const generateValidation = async (userId, projectId, request) => {
        const log = loggerWithProjectId(userId, projectId);
        const startTime = Date.now();

        if (!request || typeof request !== 'object') {
            throw new Error('Invalid validation request format');
        }

        try {
            await saveValidationInput(projectId, request);

            withDuration(log, startTime).info('Starting parallel analysis execution');

            processInitialAnalysis(log, projectId, request)
                .then(({ hww, tamSamSom }) => {
                    withDuration(log, startTime)
                        .info('Validation initial analysis completed');

                    return processAsyncValidation(log, projectId, {
                        userInput: request,
                        hww,
                        tamSamSom
                    })
                })
                .finally(() => withDuration(log, startTime).info('Validation analysis completed'))
                .catch(error =>
                    withDuration(log, startTime).error({ error }, 'Initial analysis failed in async context'));
            return await projectRepo.get(projectId);
        } catch (error) {
            log.error({ error: error.message }, 'Validation generation failed');
            throw error;
        }
    };
    return { generateValidation };
};

export default createValidationService();
