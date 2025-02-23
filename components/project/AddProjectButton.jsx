'use client';

import { useRouter } from 'next/navigation';
import addProject from './createProject';

const AddProjectButton = ({ disabled }) => {
    const router = useRouter();

    const handleClick = async () => {
        try {
            await addProject(router);
        } catch (error) {
            console.error('Failed to create project:', error);
            // You might want to show a toast notification here
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`fixed bottom-8 right-8 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            title={disabled ? "Project limit reached" : "Create new project"}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
        </button>
    );
};

export default AddProjectButton;