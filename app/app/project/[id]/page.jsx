import EditProjectComponent from "@/components/project/edit/EditProjectComponent";
import { createClient } from "@/lib/db/dbServer";

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