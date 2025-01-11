import React from 'react';
import { createClient } from '@/lib/db/dbServer';

const DashboardPage = async () => {
  const supabase = await createClient();

  const { data: projects } = await supabase.from('projects').select();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">➕ Add Project</button>
      </div>
      <ul className="list-disc pl-5">
        {projects?.map((project) => (
          <li key={project.id} className="mb-2">
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;