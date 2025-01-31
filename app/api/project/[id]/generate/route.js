import { NextResponse } from 'next/server';
import projectService from "@/lib/service/project_service";
import { getUserId } from '@/lib/db/dbServer';
import log from '@/lib/logger';

const handlers = {
    'validation': projectService.generateProjectValidation,
};

export async function POST(request, { params }) {
    const { id } = await params;
    const userId = await getUserId();
    let logger = log.child({ userId, projectId: id });

    if (!userId) {
        return NextResponse.error({ status: 401 });
    }

    try {
        logger.info('Starting project generation request');

        const body = await request.json();
        logger.info({ body }, 'Request body received');

        const { type, data } = body;

        logger = logger.child({ type });

        if (!type || !data) {
            logger.warn('Missing required fields in request');
            return NextResponse.json({
                success: false,
                error: 'Missing required fields'
            }, { status: 400 });
        }

        const handler = handlers[type];
        if (!handler) {
            logger.warn('Invalid request type');
            return NextResponse.json({
                success: false,
                error: 'Invalid request type'
            }, { status: 400 });
        }

        logger.info('Executing handler');
        const res = await handler(userId, id, data);
        logger.info('Handler executed successfully');

        return NextResponse.json(res);
    } catch (error) {
        logger.error({ error: error.message, stack: error.stack }, 'Error generate analysis for a project');
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}