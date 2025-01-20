import ProjectTable from '@/components/project/ProjectTable';
import AddProjectButton from '@/components/project/AddProjectButton';
import projectRepo from '@/lib/db/repository/project_repo';

const DashboardPage = async () => {
  const projects = await projectRepo.getProjectsIdAndNames();

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