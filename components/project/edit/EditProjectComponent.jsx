'use client'

import { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash/debounce'
import projecApi from '@/lib/client/api/project_api'
import ValidationComponent from '@/components/project/analysis/validation/ValidationComponent'
import UserResearchComponent from '@/components/project/analysis/user_research/UserResearchComponent'
import CustomerJourneyMapComponent from '@/components/project/analysis/customer_journey_map/CustomerJourneyMapComponent'
import NavigationPanel from '@/components/project/edit/NavigationPanel'
import { useRouter, useSearchParams } from 'next/navigation';
import eventEmitter, { eventItemVisible } from '@/lib/client/eventEmitter';

export default function EditProjectComponent({ project: initialProject }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState(initialProject)
    const [name, setName] = useState(initialProject.name)
    const [error, setError] = useState(null)
    const [nameLoading, setNameLoading] = useState(false)
    const [activeItem, setActiveItem] = useState(
        {
            itemId: searchParams.get('itemId') || 'validation',
            subItemId: searchParams.get('subItemId') || 'user-input'
        }
    );

    const withLoading = (fn) => {
        return (...args) => {
            setLoading(true)
            setError(null)

            fn(...args)
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => setLoading(false));
        }
    }

    const handleValidationSubmit = withLoading((formData) => {
        console.log('handleValidationSubmit:', JSON.stringify(project));
        return projecApi.generateProjectValidation(project.id, formData)
            .then(newProject => {
                setProject(newProject);
                setName(newProject.name);
            });
    })

    const debouncedUpdateProjectName = useCallback(
        debounce((newName) => {
            setNameLoading(true)
            return projecApi.updateProjectName(project.id, newName)
                .then((resp) => setName(resp.name))
                .catch((err) => setError(err.message))
                .finally(() => setNameLoading(false));
        }, 1000),
        [project.id]
    )

    const handleNameChange = (e) => {
        const newName = e.target.value
        setName(newName)
        debouncedUpdateProjectName(newName)
    }

    const handleBlur = () => {
        debouncedUpdateProjectName.flush()
    }

    const handleItemChange = (item) => {
        setActiveItem(item);
        const params = new URLSearchParams(searchParams);
        params.set('itemId', item.itemId);
        params.set('subItemId', item.subItemId);
        const newUrl = `/application/project/${project.id}?${params.toString()}`;
        window.history.pushState(null, '', newUrl);
    };

    useEffect(() => {
        const unsubscribe = eventEmitter.subscribe(eventItemVisible, (item) => {
            handleItemChange(item);
        });

        return () => unsubscribe();
    }, []);


    return (
        // Make container full width and min-height on mobile
        <div className="min-h-screen w-full">
            {/* Error alert - make it stack on mobile */}
            {error && (
                <div className="mx-4 my-2 sm:mx-0 mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold block sm:inline">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                    <button
                        className="absolute top-0 right-0 px-4 py-3"
                        onClick={() => setError(null)}
                    >
                        <span className="sr-only">Close</span>
                        <svg className="h-5 w-5 sm:h-6 sm:w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Header - adjust padding and text size for mobile */}
            <div className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-5">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <input
                            type="text"
                            value={name || ''}
                            onChange={handleNameChange}
                            onBlur={handleBlur}
                            className="text-xl sm:text-2xl font-semibold leading-6 text-gray-900 sm:text-3xl sm:tracking-tight w-full bg-transparent border-0 focus:ring-0 focus:outline-none"
                            placeholder="Enter project name"
                        />
                        {nameLoading && (
                            <span className="text-xs sm:text-sm text-gray-500">Saving...</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content layout - stack on mobile, side-by-side on desktop */}
            <div className="flex flex-col sm:flex-row h-[calc(100vh-88px)]">
                {/* Navigation panel - full width on mobile, fixed width on desktop */}
                <div className="w-full sm:w-80 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-200 bg-white p-4 sm:p-6">
                    <NavigationPanel
                        activeItem={activeItem}
                        onNavigate={handleItemChange}
                    />
                </div>

                {/* Main content - scrollable container */}
                <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                    {activeItem.itemId === 'validation' && (
                        <ValidationComponent
                            activeItemId={activeItem.subItemId}
                            project={project}
                            onSubmit={handleValidationSubmit}
                            loading={loading}
                        />
                    )}
                    {activeItem.itemId === 'user-research' && (
                        <UserResearchComponent
                            activeItemId={activeItem.subItemId}
                            project={project}
                        />
                    )}
                    {activeItem.itemId === 'journey-map' && (
                        <CustomerJourneyMapComponent
                            activeItemId={activeItem.subItemId}
                            project={project}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
