import { NextResponse } from 'next/server';
import projectService from '@/lib/service/project_service';
import { getUserId } from '@/lib/db/dbServer';
import { loggerWithProjectId } from '@/lib/logger';

export async function POST(request, { params }) {
    const userId = await getUserId();
    const { id } = await params;
    const log = loggerWithProjectId(userId, id);

    try {
        const access = await request.json();
        await projectService.updateAccess(userId, id, access);
        return NextResponse.json({ success: true });
    } catch (error) {
        log.error({ message: error.message }, 'Error updating project access');
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: error.status || 500 }
        );
    }
}
