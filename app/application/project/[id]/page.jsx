import EditProjectComponent from "@/components/project/edit/EditProjectComponent";
import projectService from "@/lib/service/project_service";
import { getUserId } from "@/lib/db/dbServer";
import { redirect } from 'next/navigation'
import logger from "@/lib/logger";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const userId = await getUserId();
    const project = await projectService.getProject(userId, id);

    return {
        title: project?.name || 'Project Details',
        description: `Manage and edit details for project ${project?.name || id}`
    };
}

export default async function ProjectPage({ params }) {
    const { id } = await params;
    const userId = await getUserId();

    try {
        const project = await projectService.getProject(userId, id);
        
        if (!project) {
            redirect('/error?message=Project not found');
        }

        return (
            <div>
                <EditProjectComponent project={project} />
            </div>
        );
    } catch (error) {
        if (!userId || error.status === 403) {
            redirect('/login');
        }
        logger.error({ error, projectId: id }, 'Error loading project page');
        redirect('/error?message=Error loading project');
    }
}