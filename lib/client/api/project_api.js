
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
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error);
        }
        return data.content;
    },

    async updateProjectName(projectId, name) {
        const response = await fetch(`/api/project/${projectId}/update-name`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error);
        }
        return data.content;
    }
}

export default projecApi;