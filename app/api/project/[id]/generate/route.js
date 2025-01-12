import { NextResponse } from 'next/server';
import projectService from "@/lib/service/project_service";

const handlers = {
    'validation': projectService.generateProjectValidation,
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