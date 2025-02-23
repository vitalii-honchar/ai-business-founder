import { NextResponse } from 'next/server';
import projectService from '@/lib/service/project_service';
import { getUserId } from '@/lib/db/dbServer';
import { loggerWithUserId } from '@/lib/logger';
import { SubscriptionError } from '@/lib/domain/user_profile';
const getBody = async (request) => {
    try {
        const body = await request.json();
        return body;
    } catch (error) {
        return null;
    }
}

export async function POST(request) {
    const userId = await getUserId();
    const log = loggerWithUserId(userId);

    try {
        log.info('Starting project creation and validation');

        const body = await getBody(request);
        const project = await projectService.createProject(userId);
        if (body) {
            const projectWithValidation = await projectService.generateProjectValidation(userId, project.id, body);
            log.info({ projectId: project.id }, 'Project created and validation generated');

            return NextResponse.json(projectWithValidation);
        }
        log.info({ projectId: project.id }, 'Project created');
        return NextResponse.json(project);
    } catch (error) {
        log.error({ error: error.message, stack: error.stack }, 'Error creating project');
        return NextResponse.json({
            success: false,
            error: error.message,
            name: error.name,
        }, { status: error.status || 500 });
    }
}