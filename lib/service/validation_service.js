import { analyzeHww, analyzeTamSamSom, analyzeCompetitors, summarizeValidation, optimizeUserInput, createName } from "@/lib/ai/ai";
import projectUpdateService from "@/lib/service/project_update_service";
import projectRepo from "@/lib/db/repository/project_repo";
import { withDuration, loggerWithProjectId } from '@/lib/logger';

const validationTasks = {
    generateName: 'generate_name',
    analyzeHhww: 'analyze_hww',
    analyzeTamSamSom: 'analyze_tam_sam_som',
    analyzeCompetitors: 'analyze_competitors',
    generateSummary: 'generate_summary',
    generateOptimizations: 'generate_optimizations'
};

const defaultData = { input: {}, tasks: {}, access: {}, analysis: { validation: {} } };

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
const analyzeAndSaveTamSamSom = async (log, projectId, data) => {
    const startTime = Date.now();
    const tamSamSom = await analyzeTamSamSom(data);

    withDuration(log, startTime).info('TAM SAM SOM analysis completed');

    var price = data.hww.how_big_a_problem_is.readiness_to_pay.pricing;

    const updateMarketRevenue = (market) => {
        market.price_per_user = price;
        market.amount_of_money = price * market.number_of_users;
    };

    updateMarketRevenue(tamSamSom.total_addressable_market);
    updateMarketRevenue(tamSamSom.serviceable_available_market);
    updateMarketRevenue(tamSamSom.serviceable_obtainable_market);

    tamSamSom.market_landscape.market_size = Math.floor(tamSamSom.serviceable_obtainable_market.number_of_users * tamSamSom.market_landscape.conversion_rate);
    tamSamSom.market_landscape.market_revenue = tamSamSom.market_landscape.market_size * price;
    
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

// Generate Optimizations
const generateOptimizations = async (log, projectId, analysisData) => {
    const startTime = Date.now();
    const optimizations = await optimizeUserInput(analysisData);

    withDuration(log, startTime).info('Optimizations generation completed');

    await projectUpdateService.updateProject(projectId, async (project) => {
        project.data.analysis.validation.optimizations = optimizations;
        project.data.tasks.validation = completeTask(project, validationTasks.generateOptimizations);
    });

    return optimizations;
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

    const processAsyncValidation = async (log, projectId, userInput) => {
        const data = { userInput };

        const hww = await analyzeAndSaveHww(log, projectId, data);
        data.hww = hww;

        const tamSamSom = await analyzeAndSaveTamSamSom(log, projectId, data);
        data.tamSamSom = tamSamSom;

        const competitorAnalysis = await generateAnalyzeCompetitors(log, projectId, data);
        data.competitorAnalysis = competitorAnalysis;

        const summary = await generateSummary(log, projectId, data);
        data.summary = summary;

        await generateOptimizations(log, projectId, data);
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

            generateAndSaveName(log, projectId, request);
            processAsyncValidation(log, projectId, request)
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
