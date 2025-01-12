
const projecApi = {
    async generateProjectValidation(id, input) {
        const response = await fetch(`/api/project/${id}/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'validation',
                data: input
            }),
        });
        return await response.json();
    },

    async updateProjectName(projectId, name) {
        const response = await fetch(`/api/project/${projectId}/update-name`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        return await response.json();
    }
}

export default projecApi;