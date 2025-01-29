import projectRepo from "@/lib/db/repository/project_repo";

const MAX_RETRIES = 3;
const MIN_DELAY = 500;
const MAX_DELAY = 2000;

const createProjectUpdateService = () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const getRandomDelay = () => 
        Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;

    const shouldRetry = (error, attempts) =>
        attempts < MAX_RETRIES && error.message?.includes('Version mismatch');

    const retryProjectUpdate = async (projectId, updateFn) => {
        let attempts = 0;
        while (attempts < MAX_RETRIES) {
            try {
                const project = await projectRepo.get(projectId);
                await updateFn(project);
                await projectRepo.updateProject(project);
            } catch (error) {
                if (!shouldRetry(error, ++attempts)) {
                    throw error;
                }
                await delay(getRandomDelay());
            }
        }
    };

    const updateProject = async (projectId, updateFn) =>
        retryProjectUpdate(projectId, updateFn);

    return { updateProject };
};

export default createProjectUpdateService();
