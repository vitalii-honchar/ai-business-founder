import { NextResponse } from 'next/server';
import projectService from '@/lib/service/project_service';
import { getUserId } from '@/lib/db/dbServer';


export async function GET(request, { params }) {
    try {
        const userId = await getUserId();
        const { id } = await params;
        const project = await projectService.getProject(userId, id);

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error getting project:', error);
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: error.status || 500 }
        );
    }
}
