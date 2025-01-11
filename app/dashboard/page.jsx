import { createClient } from '@/lib/db/dbServer';
import ProjectTable from '@/components/project/projectTable';

const DashboardPage = async () => {
  const supabase = await createClient();

  const { data: projects } = await supabase.from('projects').select();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">➕ Add Project</button>
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
};

export default DashboardPage;