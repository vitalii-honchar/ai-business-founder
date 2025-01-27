import { NextResponse } from 'next/server';
import projectService from '@/lib/service/project_service';
import { getUserId } from '@/lib/db/dbServer';
import log from '@/lib/logger';

export async function GET(request, { params }) {
    const userId = await getUserId();
    const { id } = await params;
    const logger = log.child({ userId, projectId: id });

    try {
        const project = await projectService.getProject(userId, id);

        return NextResponse.json(project);
    } catch (error) {
        logger.error({ error: error.message, stack: error.stack }, 'Error getting project by id');
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: error.status || 500 }
        );
    }
}
