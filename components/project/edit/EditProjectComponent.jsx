'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import debounce from 'lodash/debounce'
import projecApi from '@/lib/client/api/project_api'
import ValidationComponent from '@/components/project/analysis/validation/ValidationComponent'
import UserResearchComponent from '@/components/project/analysis/user_research/UserResearchComponent'
import CustomerJourneyMapComponent from '@/components/project/analysis/customer_journey_map/CustomerJourneyMapComponent'
import NavigationPanel from '@/components/project/edit/NavigationPanel'
import { useSearchParams } from 'next/navigation';
import eventEmitter, { eventItemVisible } from '@/lib/client/eventEmitter';
import useProjectPolling from '@/lib/client/hooks/useProjectPolling'

export default function EditProjectComponent({ project: initialProject }) {
    const nameInputRef = useRef(null);
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(false)
    const { project, startPolling } = useProjectPolling(initialProject)
    const [name, setName] = useState(initialProject.name)
    const [error, setError] = useState(null)
    const [nameLoading, setNameLoading] = useState(false)
    const [activeItem, setActiveItem] = useState(
        {
            itemId: searchParams.get('itemId') || 'validation',
            subItemId: searchParams.get('subItemId') || 'user-input'
        }
    );
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

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
                setName(newProject.name);
                startPolling(); // Start polling after validation begins
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
        closeNav();
    };

    useEffect(() => {
        const unsubscribe = eventEmitter.subscribe(eventItemVisible, (item) => {
            handleItemChange(item);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen w-full relative">
            {/* Error alert */}
            {error && (
                <div className="mx-2 my-2 sm:mx-0 mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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

            {/* Header */}
            <div className="border-b border-gray-200 bg-white px-2 py-2 sm:px-6 sm:py-5 flex items-center justify-between">
                <button
                    className="sm:hidden mr-4"
                    onClick={toggleNav}
                >
                    <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <div className="flex-1 min-w-0">
                    <input
                        ref={nameInputRef}
                        type="text"
                        value={name || ''}
                        onChange={handleNameChange}
                        onBlur={handleBlur}
                        className="text-lg sm:text-2xl font-semibold leading-6 text-gray-900 sm:text-3xl sm:tracking-tight w-full bg-transparent border-0 focus:ring-0 focus:outline-none truncate"
                        placeholder="Enter project name"
                    />
                    {nameLoading && (
                        <span className="text-xs sm:text-sm text-gray-500">Saving...</span>
                    )}
                </div>
            </div>

            {/* Content layout - modified for better space utilization */}
            <div className="flex flex-col sm:flex-row h-[calc(100vh-88px)]">
                {/* Navigation panel - make it narrower */}
                <div className={`fixed inset-0 z-50 bg-white p-2 sm:p-4 transform ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform sm:relative sm:translate-x-0 sm:w-64 sm:flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-200`}>
                    <button
                        className="sm:hidden mb-4"
                        onClick={toggleNav}
                    >
                        <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <NavigationPanel
                        activeItem={activeItem}
                        onNavigate={handleItemChange}
                    />
                </div>

                {/* Main content - maximize width and adjust padding */}
                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    <div className="h-full mx-auto px-2 sm:px-4 py-4">
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
        </div>
    )
}
