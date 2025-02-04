import { NextResponse } from 'next/server';
import projectService from '@/lib/service/project_service';
import { getUserId } from '@/lib/db/dbServer';
import { loggerWithProjectId } from '@/lib/logger';

export async function GET(request, { params }) {
    const userId = await getUserId();
    const { id } = await params;
    const logger = loggerWithProjectId(userId, id);

    try {
        const project = await projectService.getProject(userId, id);

        return NextResponse.json(project);
    } catch (error) {
        logger.error({ error }, 'Error getting project by id');
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: error.status || 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const userId = await getUserId();
    const { id } = await params;
    const log = loggerWithProjectId(userId, id);
    
    try {
        if (!id) {
            return NextResponse.json({ message: 'No projectId provided' }, { status: 400 });
        }
        log.info('Deleting project');
        await projectService.deleteProject(userId, id);
        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        log.error({ error: error.message, stack: error.stack }, 'Error deleting project');
        return NextResponse.json({ success: false, error: error.message }, { status: error.status || 500 });
    }
}