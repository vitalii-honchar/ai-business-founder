import { analyzeHww, analyzeTamSamSom, analyzeCompetitors, summarizeValidation, createName } from "@/lib/ai/ai";
import projectRepo from "@/lib/db/repository/project_repo";
import logger from '@/lib/logger';

const projectService = {

    async updateName(userId, projectId, request) {
        const log = logger.child({ userId, projectId });
        log.info({ name: request?.name }, 'Updating project name');
        
        if (!request || typeof request !== 'object') {
            log.error('Invalid data format for name update');
            throw new Error('Invalid data format');
        }

        await projectRepo.updateName(projectId, request.name);
        log.info({ name: request.name }, 'Project name updated successfully');
        return request.name;
    },

    async generateProjectValidation(userId, projectId, request) {
        const log = logger.child({ userId, projectId });
        log.info('Starting project validation generation');
        
        if (!request || typeof request !== 'object') {
            log.error('Invalid data format for validation');
            throw new Error('Invalid data format');
        }

        const tasks = [
            analyzeHww(request),
            analyzeTamSamSom(request),
            createName(request),
        ]

        try {
            const [hwwResponse, tamSamSomResponse, nameResponse] = await Promise.all(tasks);

            const competitorAnalysisRequest = {
                userInput: request,
                hww: hwwResponse,
                tamSamSom: tamSamSomResponse,
            };
            const competitorAnalysisRepsonse = await analyzeCompetitors(competitorAnalysisRequest);

            const summaryResponse = await summarizeValidation({ competitorAnalysis: competitorAnalysisRepsonse, ...competitorAnalysisRequest });

            const project = await projectRepo.get(projectId);

            const data = project.data || {
                input: {},
                analysis: {
                    validation: {}
                }
            };


            data.input.validation = request;

            project.name = nameResponse.name;
            data.analysis.validation.hww = hwwResponse;
            data.analysis.validation.tamSamSom = tamSamSomResponse;
            data.analysis.validation.competitorAnalysis = competitorAnalysisRepsonse;
            data.analysis.validation.summary = summaryResponse;

            project.data = data;
            log.info({project}, 'Updating project with validation analysis');
            await projectRepo.updateProject(project);

            return project;
        } catch (error) {
            log.error({ error: error.message }, 'Validation analysis failed');
            throw new Error(`Validation analysis failed: ${error.message}`);
        }
    }
}

export default projectService;