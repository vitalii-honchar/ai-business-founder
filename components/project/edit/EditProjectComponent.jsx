'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import projecApi from '@/lib/client/api/project_api'
import ValidationComponent from '@/components/project/analysis/validation/ValidationComponent'
import UserResearchComponent from '@/components/project/analysis/user_research/UserResearchComponent'
import CustomerJourneyMapComponent from '@/components/project/analysis/customer_journey_map/CustomerJourneyMapComponent'
import NavigationPanel from '@/components/project/edit/NavigationPanel'
import { useSearchParams, useRouter } from 'next/navigation';
import eventEmitter, { eventItemVisible } from '@/lib/client/eventEmitter';
import useProjectPolling from '@/lib/client/hooks/useProjectPolling';
import useUserId from '@/lib/client/hooks/useUserId';
import get from 'lodash/get';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import { getScoreColor, getScoreTextColor } from "@/lib/metrics/worthSolvingScore";
import useUserProfileLimits from '@/lib/client/hooks/useUserProfileLimits';
import UsageLimitReachedMessage, { UsageLimitType } from '@/components/subscription/UsageLimitReachedMessage';

export default function EditProjectComponent({ project: initialProject }) {
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(false)
    const { project, startPolling, setProject } = useProjectPolling(initialProject);
    const { userId } = useUserId();
    const [error, setError] = useState(null)
    const [activeItem, setActiveItem] = useState(
        {
            itemId: searchParams.get('itemId') || 'validation',
            subItemId: searchParams.get('subItemId') || 'user-input'
        }
    );
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const router = useRouter();
    const isReadOnly = () => userId !== project?.user_id;

    const { userProfileLimits, updateUserProfileLimits } = useUserProfileLimits(userId);

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
        return projecApi.generateProjectValidation(project.id, formData)
            .then(newProject => {
                updateUserProfileLimits();
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
        const totalTasks = ['hww', 'tamSamSom', 'competitorAnalysis', 'summary', 'optimizations'];
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

    const handleCopyUrl = async () => {
        const url = window.location.origin + window.location.pathname;
        try {
            await navigator.clipboard.writeText(url);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDeleteProject = withLoading(async () => {
        try {
            await projecApi.deleteProject(project.id);
            window.location.href = '/?timestamp=' + Date.now();
        } catch (err) {
            setError(err.message);
        }
    });

    // Add this function to check validation limits
    const hasReachedValidationLimit = () => {
        if (!userProfileLimits) return false;
        
        if (project.user_id !== userId) {
            return false;
        }

        if (!userProfileLimits.limits.maxValidationsPerProject) {
            return false;
        }

        const validationCount = userProfileLimits.usage.validationsPerProject[project.id] ?? 0;
        return validationCount >= userProfileLimits.limits.maxValidationsPerProject;
    };

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
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    {/* Mobile Title Row */}
                    <div className="flex items-center gap-3 sm:hidden">
                        <button
                            className="flex-shrink-0 -ml-1 p-1"
                            onClick={toggleNav}
                        >
                            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        <div className="flex-1 flex flex-col min-w-0">
                            <div className="flex items-center justify-between">
                                <h1 className="text-base font-medium text-gray-900 truncate pr-2">
                                    {project.name}
                                </h1>
                                {renderAnalysisStatus(true)}
                            </div>
                            {project.description && (
                                <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">
                                    {project.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex flex-1 items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                                {project.name}
                            </h1>
                            {project.description && (
                                <p className="mt-1 text-sm text-gray-600 max-w-2xl line-clamp-2">
                                    {project.description}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            {!isReadOnly() && (
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
                                    {project?.data?.access?.accessByLink && (
                                        <button
                                            type="button"
                                            onClick={handleCopyUrl}
                                            className="inline-flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                                        >
                                            {showCopied ? (
                                                <>
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>Copy URL</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}

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

                    {/* Mobile Controls Row */}
                    <div className="sm:hidden flex items-center border-t border-gray-100 pt-2 mt-1">
                        <div className="flex-1 flex items-center justify-between gap-4">
                            {!isReadOnly() && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-600">Share</span>
                                    <button
                                        type="button"
                                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${project?.data?.access?.accessByLink ? 'bg-blue-600' : 'bg-gray-200'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        role="switch"
                                        aria-checked={project?.data?.access?.accessByLink ?? false}
                                        disabled={loading || project?.data?.access === null}
                                        onClick={handleAccessToggle}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${project?.data?.access?.accessByLink ? 'translate-x-4' : 'translate-x-0'}`}
                                        />
                                    </button>
                                    {project?.data?.access?.accessByLink && (
                                        <button
                                            type="button"
                                            onClick={handleCopyUrl}
                                            className="inline-flex items-center p-1 text-xs text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                                        >
                                            {showCopied ? (
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}

                            {project?.data?.analysis?.validation?.summary?.recommendation?.worth_solving && (
                                <button
                                    onClick={handleScoreClick}
                                    className="flex items-center gap-2"
                                    aria-label="View validation summary"
                                >
                                    <span className="text-xs text-gray-600">Score:</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className={`${getScoreColor(project.data.analysis.validation.summary.recommendation.worth_solving)} rounded-full h-1.5 transition-all duration-300`}
                                                style={{ width: `${project.data.analysis.validation.summary.recommendation.worth_solving * 10}%` }}
                                            />
                                        </div>
                                        <span className={`text-xs font-medium ${getScoreTextColor(project.data.analysis.validation.summary.recommendation.worth_solving)}`}>
                                            {project.data.analysis.validation.summary.recommendation.worth_solving}
                                        </span>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex sm:flex-row relative pb-[60px]">
                {/* Overlay for mobile */}
                {isNavOpen && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 sm:hidden"
                        onClick={closeNav}
                    />
                )}

                {/* Navigation panel */}
                <div className={`fixed sm:relative sm:flex-none inset-0 bottom-[60px] z-50 bg-white transform ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out sm:translate-x-0 sm:w-64 border-r border-gray-200`}>
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto">
                            <NavigationPanel
                                activeItem={activeItem}
                                onNavigate={handleItemChange}
                                project={project}
                                closeNav={closeNav}
                            />
                        </div>
                        {!isReadOnly() && (
                            <div className="p-4 border-t border-gray-200">
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="w-full px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                                    disabled={loading}
                                >
                                    <span>🗑️</span>
                                    <span>Delete Project</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content area */}
                <div className="w-full sm:flex-1 overflow-auto bg-gray-50">
                    <div className="px-2 sm:px-4 py-4">
                        {/* Add Usage Limit Message */}
                        {hasReachedValidationLimit() && activeItem.itemId === 'validation' && (
                            <UsageLimitReachedMessage
                                type={UsageLimitType.VALIDATIONS}
                                userProfile={userProfileLimits.limits}
                                className="mb-4 mx-auto"
                            />
                        )}

                        {activeItem.itemId === 'validation' && (
                            <ValidationComponent
                                activeItemId={activeItem.subItemId}
                                project={project}
                                onSubmit={handleValidationSubmit}
                                readOnly={isReadOnly() || hasReachedValidationLimit()}
                                reachedValidationLimit={hasReachedValidationLimit()}
                                userProfileLimits={userProfileLimits}
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

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    setShowDeleteModal(false);
                    handleDeleteProject();
                }}
                title="Confirm Delete 🗑️"
                message="Are you sure you want to delete this project?"
                confirmText="Delete"
                confirmIcon="🗑️"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
                isLoading={loading}
            />
        </div>
    )
}
