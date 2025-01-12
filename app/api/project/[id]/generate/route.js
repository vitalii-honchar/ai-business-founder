import { NextResponse } from 'next/server';
import { analyzeHww, analyzeTamSamSom } from "@/lib/ai/ai";
import { repo as projectRepo } from "@/lib/db/repository/project_repo";

const handleValidation = async (projectId, data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format');
    }

    const tasks = [
        analyzeHww(data),
        analyzeTamSamSom(data),
    ]

    try {
        const [hwwResponse, tamSamSomResponse] = await Promise.all(tasks);

        const project = await projectRepo.get(projectId);

        console.log('Project:', project);

        const data = project.data || {
            analysis: {
                validation: {}
            }
        };

        data.analysis.validation.hww = hwwResponse;
        data.analysis.validation.tamSamSom = tamSamSomResponse;
        project.data = data;
        await projectRepo.updateData(projectId, project.version, data);

        return project;
    } catch (error) {
        throw new Error(`Validation analysis failed: ${error.message}`);
    }
};

const handlers = {
    'validation': handleValidation,
};

export async function POST(request, { params }) {
    try {
        const { id } = await params;
        console.log('Project ID:', id);

        const body = await request.json();
        console.log('Request body:', body); // Add logging for request body

        const { type, data } = body;

        if (!type || !data) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields'
            }, { status: 400 });
        }

        const handler = handlers[type];
        if (!handler) {
            return NextResponse.json({
                success: false,
                error: 'Invalid request type'
            }, { status: 400 });
        }

        const content = await handler(id, data);
        return NextResponse.json({
            success: true,
            data: content
        });
    } catch (error) {
        console.error('Error processing request:', error); // Add error logging
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}