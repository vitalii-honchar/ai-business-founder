'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import projecApi from '@/lib/client/api/project_api'
import ValidationComponent from '@/components/project/analysis/validation/ValidationComponent'
import UserResearchComponent from '@/components/project/analysis/user_research/UserResearchComponent'
import CustomerJourneyMapComponent from '@/components/project/analysis/customer_journey_map/CustomerJourneyMapComponent'
import NavigationPanel from '@/components/project/edit/NavigationPanel'
import { useSearchParams } from 'next/navigation';
import eventEmitter, { eventItemVisible } from '@/lib/client/eventEmitter';
import useProjectPolling from '@/lib/client/hooks/useProjectPolling'
import get from 'lodash/get';

export default function EditProjectComponent({ project: initialProject }) {
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(false)
    const { project, startPolling, setProject } = useProjectPolling(initialProject)
    const [error, setError] = useState(null)
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
                startPolling(newProject);
            });
    })

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

    // Add useEffect to handle body scrolling
    useEffect(() => {
        if (isNavOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isNavOpen]);

    const getTasksStatus = () => {
        const totalTasks = ['hww', 'tamSamSom', 'competitorAnalysis', 'summary'];
        const pendingTasks = project?.data?.tasks?.validation?.length ?? 0;
        const completedTasks = totalTasks.filter(section =>
            get(project?.data?.analysis?.validation, section)
        ).length;

        return {
            pending: pendingTasks,
            completed: completedTasks,
            total: totalTasks.length
        };
    };

    const renderAnalysisStatus = (isMobile = false) => {
        const { pending, completed, total } = getTasksStatus();

        if (pending > 0) {
            return (
                <div className={`flex ${isMobile ? 'flex-col items-center gap-1' : 'items-center gap-2'} text-blue-500`}>
                    <svg className={`animate-spin ${isMobile ? 'h-7 w-7' : 'h-5 w-5'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <div className={`flex flex-col ${isMobile ? 'items-center text-center' : 'items-start'}`}>
                        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-blue-400`}>
                            {completed}/{total} Complete
                        </span>
                    </div>
                </div>
            );
        } else if (completed > 0) {
            return (
                <div className={`flex ${isMobile ? 'flex-col items-center gap-1' : 'items-center gap-2'} text-green-600`}>
                    <svg className={`${isMobile ? 'h-7 w-7' : 'h-5 w-5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className={`flex flex-col ${isMobile ? 'items-center text-center' : 'items-start'}`}>
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                            {completed}/{total} Complete
                        </span>
                    </div>
                </div>
            );
        }
        return null;
    };

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

    const handleScoreClick = () => {
        handleItemChange({
            itemId: 'validation',
            subItemId: 'summary'
        });
    };

    const handleAccessToggle = withLoading(async () => {
        const currentAccess = project?.data?.access ?? {};
        currentAccess.accessByLink = !currentAccess.accessByLink;
        await projecApi.updateProjectAccess(project.id, { accessByLink: currentAccess.accessByLink });

        project.data.access = currentAccess;
        setProject(project);
    });

    return (
        <div className="flex flex-col">
            {/* Error alert */}
            {error && (
                <div className="absolute top-0 left-0 right-0 z-50 mx-2 my-2 sm:mx-0 mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
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

            {/* Project Header */}
            <div className="flex-none border-b border-gray-200 bg-white px-2 py-2 sm:px-6 sm:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Mobile Title Row */}
                    <div className="flex items-center gap-4 sm:hidden">
                        <button
                            className="flex-shrink-0"
                            onClick={toggleNav}
                        >
                            <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        <h1 className="text-md font-semibold text-gray-900 flex-1">
                            {project.name}
                        </h1>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex flex-1 items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                            {project.name}
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Access By Link</span>
                                <button
                                    type="button"
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${project?.data?.access?.accessByLink ? 'bg-blue-600' : 'bg-gray-200'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    role="switch"
                                    aria-checked={project?.data?.access?.accessByLink ?? false}
                                    disabled={loading || project?.data?.access === null}
                                    onClick={handleAccessToggle}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${project?.data?.access?.accessByLink ? 'translate-x-5' : 'translate-x-0'}`}
                                    />
                                </button>
                            </div>

                            {project?.data?.analysis?.validation?.summary?.recommendation?.worth_solving && (
                                <button
                                    onClick={handleScoreClick}
                                    className="group relative flex items-center gap-3 hover:opacity-90 transition-all"
                                    aria-label="View validation summary"
                                >
                                    <span className="text-base text-gray-600 whitespace-nowrap group-hover:text-gray-900">
                                        Validation Score:
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`${getScoreColor(project.data.analysis.validation.summary.recommendation.worth_solving)} group-hover:brightness-110 rounded-full h-2 transition-all duration-300`}
                                                style={{ width: `${project.data.analysis.validation.summary.recommendation.worth_solving * 10}%` }}
                                            />
                                        </div>
                                        <span className={`text-base font-medium ${getScoreTextColor(project.data.analysis.validation.summary.recommendation.worth_solving)} group-hover:opacity-80`}>
                                            {project.data.analysis.validation.summary.recommendation.worth_solving}/10
                                        </span>
                                    </div>
                                    <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg transition-all duration-200 whitespace-nowrap">
                                        Click to view validation summary
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-2">
                                            <div className="border-solid border-t-gray-900 border-t-8 border-x-transparent border-x-8 border-b-0"></div>
                                        </div>
                                    </div>
                                </button>
                            )}

                            <div>
                                {renderAnalysisStatus(false)}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Status Row */}
                    <div className="sm:hidden flex items-center justify-between gap-4">
                        <div className="flex-1 flex items-center justify-between">
                            {project?.data?.analysis?.validation?.summary?.recommendation?.worth_solving && (
                                <button
                                    onClick={handleScoreClick}
                                    className="flex items-center gap-2 hover:opacity-90 transition-all"
                                    aria-label="View validation summary"
                                >
                                    <span className="text-sm text-gray-600 whitespace-nowrap">Score:</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`${getScoreColor(project.data.analysis.validation.summary.recommendation.worth_solving)} rounded-full h-2 transition-all duration-300`}
                                                style={{ width: `${project.data.analysis.validation.summary.recommendation.worth_solving * 10}%` }}
                                            />
                                        </div>
                                        <span className={`text-sm font-medium whitespace-nowrap ${getScoreTextColor(project.data.analysis.validation.summary.recommendation.worth_solving)}`}>
                                            {project.data.analysis.validation.summary.recommendation.worth_solving}/10
                                        </span>
                                    </div>
                                </button>
                            )}

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${project?.data?.access?.accessByLink ? 'bg-blue-600' : 'bg-gray-200'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    role="switch"
                                    aria-checked={project?.data?.access?.accessByLink ?? false}
                                    disabled={loading || project?.data?.access === null}
                                    onClick={handleAccessToggle}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${project?.data?.access?.accessByLink ? 'translate-x-5' : 'translate-x-0'}`}
                                    />
                                </button>
                                <span className="text-sm text-gray-600">Share</span>
                            </div>
                        </div>

                        <div className="flex-shrink-0 ml-2">
                            {renderAnalysisStatus(true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex sm:flex-row relative min-h-[calc(100vh-280px)]">
                {/* Overlay for mobile */}
                {isNavOpen && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 sm:hidden"
                        onClick={closeNav}
                    />
                )}

                {/* Navigation panel - make sticky on desktop */}
                <div className={`fixed sm:sticky sm:top-0 sm:h-[calc(100vh-280px)] inset-0 z-50 bg-white transform ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out sm:translate-x-0 sm:w-64 border-r border-gray-200`}>
                    <div className="h-full overflow-y-auto">
                        <NavigationPanel
                            activeItem={activeItem}
                            onNavigate={handleItemChange}
                            project={project}
                            closeNav={closeNav}
                        />
                    </div>
                </div>

                {/* Content area - adjust padding bottom for navigation buttons */}
                <div className="w-full sm:flex-1 overflow-auto bg-gray-50">
                    <div className="px-2 sm:px-4 py-4 pb-24">
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
