import Link from "next/link";
import { getScoreColor, getScoreTextColor } from "@/lib/metrics/worthSolvingScore";

const ProjectCards = ({ projects }) => {
    const hasInProgressTasks = (project) => {
        return project.pendingTasks > 0;
    };

    const getValidationStatus = (project) => {
        if (hasInProgressTasks(project)) {
            return (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Validation in progress...</span>
                </div>
            );
        }

        return (
            <>
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-300"></span>
                    Validation Score
                </p>
                {project.worth_solving ? (
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className={`${getScoreColor(project.worth_solving)} rounded-full h-2 transition-all duration-300`}
                                    style={{ width: `${project.worth_solving * 10}%` }}
                                />
                            </div>
                        </div>
                        <span className={`text-sm font-medium ${getScoreTextColor(project.worth_solving)} min-w-[40px] text-right`}>
                            {project.worth_solving}/10
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Not validated yet
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
                <Link
                    key={index}
                    href={`/application/project/${project.id}`}
                    className="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                    prefetch={false}
                >
                    <div className="flex flex-col h-full p-5">
                        {/* Header Section */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                {project.name}
                            </h3>
                            {project.description && (
                                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                                    {project.description}
                                </p>
                            )}
                        </div>

                        {/* Score Section */}
                        <div className="mt-auto pt-4 border-t border-gray-100">
                            {getValidationStatus(project)}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProjectCards;
