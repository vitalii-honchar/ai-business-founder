const projecApi = {
    async generateProjectValidation(id, input) {
        console.log('generateProjectValidation:', JSON.stringify({ id, input }));
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
    },

    async getProject(projectId) {
        const response = await fetch(`/api/project/${projectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch project');
        }

        return response.json();
    },

    createProject: async (formData) => {
        const response = await fetch('/api/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData ? JSON.stringify(formData) : null,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create project');
        }

        return response.json();
    },

    async updateProjectAccess(projectId, access) {
        const response = await fetch(`/api/project/${projectId}/access`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(access),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update project access');
        }

        return response.json();
    },
}

export default projecApi;