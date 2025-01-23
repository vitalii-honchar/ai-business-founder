import ProjectTable from '@/components/project/ProjectTable';
import AddProjectButton from '@/components/project/AddProjectButton';
import projectRepo from '@/lib/db/repository/project_repo';

const DashboardPage = async () => {
  const projects = await projectRepo.getProjectsIdAndNames();

  return (
    <div className="container mx-auto sm:p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">Projects</h1>
        <AddProjectButton />
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
};

export default DashboardPage;