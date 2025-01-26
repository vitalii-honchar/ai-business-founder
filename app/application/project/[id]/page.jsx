import EditProjectComponent from "@/components/project/edit/EditProjectComponent";
import projectRepo from "@/lib/db/repository/project_repo";
import logger from "@/lib/logger";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const project = await projectRepo.get(id);

    return {
        title: project?.name || 'Project Details',
        description: `Manage and edit details for project ${project?.name || id}`
    };
}

export default async function ProjectPage({ params }) {
    const { id } = await params;
    try {
        const project = await projectRepo.get(id);
        return (
            <div>
                <EditProjectComponent project={project} />
            </div>
        );
    } catch (error) {
        logger.error({ error, projectId: id }, 'Error loading project page');
        return <div>Error loading project</div>;
    }
}