import { get } from 'lodash';

const navigationItems = [
    {
        title: '✅ Validation',
        id: 'validation',
        subItems: [
            {
                title: '👤 User Input',
                id: 'user-input',
            },
            {
                title: '🤔 Problem Research',
                id: 'hww'
            },
            {
                title: '📊 Market Size',
                id: 'tam-sam-som'
            },
            {
                title: '🎯 Competitor Analysis',
                id: 'competitor-analysis'
            },
            {
                title: '📋 Summary',
                id: 'summary'
            },
        ]
    },
];

const NavigationPanel = ({ onNavigate, activeItem, project, closeNav }) => {
    const isTaskPending = (taskName) => {
        return project?.data?.tasks?.validation?.includes(taskName) ?? false;
    };

    const isTaskCompleted = (analysisPath) => {
        return get(project?.data?.analysis, analysisPath) !== undefined;
    };

    const getSubItemStatus = (subItemId) => {
        const taskMap = {
            'hww': {
                taskName: 'analyze_hww',
                analysisPath: 'validation.hww'
            },
            'tam-sam-som': {
                taskName: 'analyze_tam_sam_som',
                analysisPath: 'validation.tamSamSom'
            },
            'competitor-analysis': {
                taskName: 'analyze_competitors',
                analysisPath: 'validation.competitorAnalysis'
            },
            'summary': {
                taskName: 'generate_summary',
                analysisPath: 'validation.summary'
            }
        };

        const config = taskMap[subItemId];
        if (!config) return { status: 'none' };

        if (isTaskPending(config.taskName)) {
            return { status: 'loading' };
        }
        
        if (isTaskCompleted(config.analysisPath)) {
            return { status: 'completed' };
        }

        return { status: 'pending' };
    };

    const isAnySubItemLoading = (subItems) => {
        return subItems.some(subItem => {
            const status = getSubItemStatus(subItem.id);
            return status.status === 'loading';
        });
    };

    const renderStatusIcon = (status) => {
        switch (status) {
            case 'loading':
                return (
                    <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                );
            case 'completed':
                return (
                    <div className="flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Mobile header with title and close button */}
            <div className="sm:hidden px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">🔍 Analyses</h2>
                <button
                    onClick={closeNav}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close menu"
                >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Navigation items */}
            <nav className="p-2 sm:p-4 flex-1 overflow-y-auto">
                {navigationItems.map((item) => (
                    <div key={item.id} className="mb-2">
                        <div
                            className={`
                                py-2 px-3 rounded-md cursor-pointer
                                hover:bg-gray-100 transition-colors
                                ${activeItem.itemId === item.id ? 'bg-blue-50 text-blue-600' : ''}
                                relative flex items-center justify-between
                            `}
                            onClick={() => onNavigate({ itemId: item.id, subItemId: item.subItems[0].id })}
                        >
                            <span className="pr-8 sm:pr-0">{item.title}</span>
                            {isAnySubItemLoading(item.subItems) && (
                                <svg className="animate-spin h-4 w-4 text-blue-500 absolute sm:static right-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                        </div>
                        {item.subItems && activeItem.itemId === item.id && (
                            <div className="pl-4 sm:pl-6 mt-1">
                                {item.subItems.map((subItem) => {
                                    const status = getSubItemStatus(subItem.id);
                                    const isCompleted = status.status === 'completed';
                                    const isLoading = status.status === 'loading';

                                    return (
                                        <div
                                            key={subItem.id}
                                            className={`
                                                py-1.5 px-3 rounded-md cursor-pointer
                                                text-sm sm:text-base
                                                transition-colors flex items-center justify-between
                                                ${activeItem.subItemId === subItem.id 
                                                    ? 'bg-blue-50 text-blue-600' 
                                                    : isCompleted
                                                        ? 'bg-green-50/50 text-green-700 hover:bg-green-50'
                                                        : isLoading
                                                            ? 'bg-blue-50/50 text-blue-500'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }
                                            `}
                                            onClick={() => onNavigate({ itemId: item.id, subItemId: subItem.id })}
                                        >
                                            <span>{subItem.title}</span>
                                            {renderStatusIcon(status.status)}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default NavigationPanel;
