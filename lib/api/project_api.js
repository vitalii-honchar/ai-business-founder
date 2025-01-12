

const generateProjectValidation = async (id, input) => {
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
};

export { generateProjectValidation };