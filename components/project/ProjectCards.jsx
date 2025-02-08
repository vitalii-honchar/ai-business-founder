import Link from "next/link";

const ProjectCards = ({ projects }) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
                <Link
                    key={index}
                    href={`/application/project/${project.id}`}
                    className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-[1.02] cursor-pointer"
                    prefetch={false}
                >
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{project.name}</h3>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Validation Score:</p>
                            {project.worth_solving ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`${getScoreColor(project.worth_solving)} rounded-full h-2.5 transition-all duration-300`}
                                            style={{ width: `${project.worth_solving * 10}%` }}
                                        />
                                    </div>
                                    <span className={`text-sm font-medium ${getScoreTextColor(project.worth_solving)}`}>
                                        {project.worth_solving}/10
                                    </span>
                                </div>
                            ) : (
                                <span className="text-sm text-gray-500">Not validated yet</span>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProjectCards;
