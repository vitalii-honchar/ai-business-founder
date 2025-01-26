import { NextResponse } from 'next/server';
import projectService from "@/lib/service/project_service";
import log from '@/lib/logger';
import { getUserId } from '@/lib/db/dbServer';

export async function POST(request, { params }) {
    const { id } = await params;
    const userId = await getUserId();
    let logger = log.child({ userId, projectId: id });

    try {
        const body = await request.json();
        logger.info({ body }, 'Update project name');

        const name = await projectService.updateName(userId, id, body);
        return NextResponse.json({ name });
    } catch (error) {
        logger.error({ error: error.message, stack: error.stack }, 'Error processing request');
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}