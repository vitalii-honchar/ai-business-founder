import { analyzeHww, analyzeTamSamSom } from "@/lib/ai/ai";
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
        ]

        try {
            const [hwwResponse, tamSamSomResponse] = await Promise.all(tasks);

            const project = await projectRepo.get(projectId);

            const data = project.data || {
                input: {},
                analysis: {
                    validation: {}
                }
            };

            data.input.validation = request;
            data.analysis.validation.hww = hwwResponse;
            data.analysis.validation.tamSamSom = tamSamSomResponse;
            console.log('Update project data:', JSON.stringify({ project, data }));

            project.data = data;
            await projectRepo.updateData(projectId, project.version, data);

            return project;
        } catch (error) {
            console.error('Validation analysis failed:', error);
            throw new Error(`Validation analysis failed: ${error.message}`);
        }
    }
}

export default projectService;