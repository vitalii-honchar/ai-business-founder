import ProjectTable from '@/components/project/ProjectTable';
import AddProjectButton from '@/components/project/AddProjectButton';
import { createClient } from '@/lib/db/dbServer';

const getProjects = async () => {
  const supabase = await createClient();
  const { data: projects, error } = await supabase.from('projects').select('name');
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return projects;
};

const DashboardPage = async () => {
  const projects = await getProjects();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <AddProjectButton />
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
};

export default DashboardPage;