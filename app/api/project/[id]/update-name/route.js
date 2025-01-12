import { NextResponse } from 'next/server';
import projectService from "@/lib/service/project_service";

export async function POST(request, { params }) {
    try {
        const { id } = await params;
        console.log('Update project name: projectId =', id);

        const body = await request.json();
        console.log('Update project name: body =', body);

        const name = await projectService.updateName(id, body);
        return NextResponse.json({ name });
    } catch (error) {
        console.error('Error updating name:', error); // Add error logging
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}