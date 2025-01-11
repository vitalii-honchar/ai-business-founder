import { createClient } from "@/lib/db/dbServer";

export default async function ProjectPage({ params }) {
    const { id } = params;
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
            <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
            <p>{project.description}</p>
            {/* Add more project details as needed */}
        </div>
    );
}