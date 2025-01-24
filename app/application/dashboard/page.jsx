import ProjectCards from '@/components/project/ProjectCards';
import EmptyState from '@/components/project/EmptyState';
import AddProjectButton from '@/components/project/AddProjectButton';
import projectRepo from '@/lib/db/repository/project_repo';

export const metadata = {
  title: 'Dashboard',
  description: 'Manage your AI-powered business projects and track their progress'
};

const DashboardPage = async () => {
  const projects = await projectRepo.getProjectsIdAndNames();

  return (
    <div className="container mx-auto sm:p-4 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">Projects</h1>

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ProjectCards projects={projects} />
          <AddProjectButton />
        </>
      )}
    </div>
  );
};

export default DashboardPage;