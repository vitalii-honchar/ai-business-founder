import { getProjects, createProject } from './actions';
import ProjectTable from '@/components/project/projectTable';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const projects = await getProjects();

  const handleAddProject = async () => {
    const newProject = await createProject();
    if (newProject) {
      redirect(`/projects/${newProject.id}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddProject}
        >
          ➕ Add Project
        </button>
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
};

export default DashboardPage;