import Link from "next/link";

const ProjectTable = ({ projects }) => {
    const getScoreColor = (score) => {
        if (score >= 8) return 'bg-green-600';
        if (score >= 5) return 'bg-blue-600';
        return 'bg-red-600';
    };

    const getScoreTextColor = (score) => {
        if (score >= 8) return 'text-green-600';
        if (score >= 5) return 'text-blue-600';
        return 'text-red-600';
    };

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg">
                <thead className="bg-gray-100">
                    <tr className="text-gray-700">
                        <th className="py-3 px-2 sm:px-6 text-left">Project Name</th>
                        <th className="py-3 px-2 sm:px-6 text-left">Validation</th>
                        <th className="py-3 px-2 sm:px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr
                            key={index}
                            className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-white"}`}
                        >
                            <td className="py-3 px-2 sm:px-6">{project.name}</td>
                            <td className="py-3 px-2 sm:px-6">
                                {project?.data?.analysis?.validation?.summary?.recommendation?.worth_solving ? (
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`${getScoreColor(project.data.analysis.validation.summary.recommendation.worth_solving)} rounded-full h-2 transition-all duration-300`}
                                                style={{ width: `${project.data.analysis.validation.summary.recommendation.worth_solving * 10}%` }}
                                            />
                                        </div>
                                        <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${getScoreTextColor(project.data.analysis.validation.summary.recommendation.worth_solving)}`}>
                                            {project.data.analysis.validation.summary.recommendation.worth_solving}/10
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-xs sm:text-sm text-gray-500">not validated</span>
                                )}
                            </td>
                            <td className="py-3 px-2 sm:px-6">
                                <Link href={`/application/project/${project.id}`} className="bg-blue-500 text-white font-semibold px-2 py-1 sm:px-4 sm:py-2 text-sm rounded-lg shadow hover:bg-blue-600 transition-all duration-200">
                                    Open
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;
