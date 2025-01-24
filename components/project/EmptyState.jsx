'use client';

import createProject from '@/components/project/createProject';
import { useRouter } from 'next/navigation';

const EmptyState = () => {
    const router = useRouter();

    return (
        <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
            <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No projects yet</h3>
            <p className="mt-2 text-sm text-gray-500">Get started by creating your first AI business project.</p>
            <button
                onClick={() => createProject(router)}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Project
            </button>
        </div>
    );
};

export default EmptyState;
