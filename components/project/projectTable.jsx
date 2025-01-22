import Link from "next/link";

const ProjectTable = ({ projects }) => {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg">
                <thead className="bg-gray-100">
                    <tr className="text-gray-700">
                        <th className="py-3 px-6 text-left">Project Name</th>
                        <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr
                            key={index}
                            className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-white"
                                }`}
                        >
                            <td className="py-3 px-6">{project.name}</td>
                            <td className="py-3 px-6">
                                <Link href={`/application/project/${project.id}`} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-200">
                                    Open
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default ProjectTable;
