import { analyzeHww, analyzeTamSamSom, analyzeCompetitors, summarizeValidation, createName } from "@/lib/ai/ai";
import projectRepo from "@/lib/db/repository/project_repo";

const projectService = {

    async updateName(projectId, request) {
        if (!request || typeof request !== 'object') {
            throw new Error('Invalid data format');
        }

        await projectRepo.updateName(projectId, request.name);

        return request.name;
    },

    async generateProjectValidation(projectId, request) {
        if (!request || typeof request !== 'object') {
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

            if (project.name === "New Project") {
                project.name = nameResponse.name;
            }

            data.input.validation = request;
            data.analysis.validation.hww = hwwResponse;
            data.analysis.validation.tamSamSom = tamSamSomResponse;
            data.analysis.validation.competitorAnalysis = competitorAnalysisRepsonse;
            data.analysis.validation.summary = summaryResponse;
            console.log('Update project data:', JSON.stringify({ project, data }));

            project.data = data;
            await projectRepo.updateProject(project);

            return project;
        } catch (error) {
            console.error('Validation analysis failed:', error);
            throw new Error(`Validation analysis failed: ${error.message}`);
        }
    }
}

export default projectService;