import { NextResponse } from 'next/server';
import projectService from '@/lib/service/project_service';
import { getUserId } from '@/lib/db/dbServer';
import { loggerWithUserId } from '@/lib/logger';

export async function POST(request) {
    const userId = await getUserId();
    const log = loggerWithUserId(userId);
    if (!userId) {
        return NextResponse.error({ status: 401 });
    }

    try {
        log.info('Starting project creation and validation');

        const body = await request.json();
        if (!body) {
            log.warn('Missing request body');
            return NextResponse.json({
                success: false,
                error: 'Missing request body'
            }, { status: 400 });
        }

        const project = await projectService.createProject();
        const projectWithValidation = await projectService.generateProjectValidation(userId, project.id, body);

        log.info({ projectId: project.id }, 'Project created and validation generated');

        return NextResponse.json(projectWithValidation);
    } catch (error) {
        log.error({ error: error.message, stack: error.stack }, 'Error creating project and generating validation');
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: error.status || 500 });
    }
}