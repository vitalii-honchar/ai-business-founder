import EditProjectComponent from "@/components/project/edit/EditProjectComponent";
import { createClient } from "@/lib/db/dbServer";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: project } = await supabase
        .from('projects')
        .select('name')
        .eq('id', id)
        .single();

    return {
        title: project?.name || 'Project Details',
        description: `Manage and edit details for project ${project?.name || id}`
    };
}

export default async function ProjectPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching project:', error);
        return <div>Error loading project</div>;
    }

    return (
        <div>
            <EditProjectComponent project={project} />
        </div>
    );
}