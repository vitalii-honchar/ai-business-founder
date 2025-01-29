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
                title: '🤔 HWW',
                id: 'hww'
            },
            {
                title: '📊 TAM-SAM-SOM',
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

const NavigationPanel = ({ onNavigate, activeItem, project }) => {
    const isTaskPending = (taskName) => {
        return project?.data?.tasks?.validation?.includes(taskName) ?? false;
    };

    const getSubItemLoadingState = (subItemId) => {
        const taskMap = {
            'hww': 'analyze_hww',
            'tam-sam-som': 'analyze_tam_sam_som',
            'competitor-analysis': 'analyze_competitors',
            'summary': 'generate_summary'
        };
        return taskMap[subItemId] ? isTaskPending(taskMap[subItemId]) : false;
    };

    const isAnySubItemLoading = (subItems) => {
        return subItems.some(subItem => getSubItemLoadingState(subItem.id));
    };

    return (
        <nav className="p-2 sm:p-4">
            {navigationItems.map((item) => (
                <div key={item.id} className="mb-2">
                    <div
                        className={`
                            py-2 px-3 rounded-md cursor-pointer
                            hover:bg-gray-100 transition-colors flex items-center justify-between
                            ${activeItem.itemId === item.id ? 'bg-blue-50 text-blue-600' : ''}
                        `}
                        onClick={() => onNavigate({ itemId: item.id, subItemId: item.subItems[0].id })}
                    >
                        <span>{item.title}</span>
                        {isAnySubItemLoading(item.subItems) && (
                            <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                    </div>
                    {item.subItems && activeItem.itemId === item.id && (
                        <div className="pl-4 sm:pl-6 mt-1">
                            {item.subItems.map((subItem) => {
                                const isLoading = getSubItemLoadingState(subItem.id);
                                return (
                                    <div
                                        key={subItem.id}
                                        className={`
                                            py-1.5 px-3 rounded-md cursor-pointer
                                            text-sm sm:text-base
                                            transition-colors flex items-center justify-between
                                            ${activeItem.subItemId === subItem.id 
                                                ? 'bg-blue-50 text-blue-600' 
                                                : isLoading
                                                    ? 'bg-blue-50/50 text-blue-500'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }
                                        `}
                                        onClick={() => onNavigate({ itemId: item.id, subItemId: subItem.id })}
                                    >
                                        <span>{subItem.title}</span>
                                        {isLoading && (
                                            <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default NavigationPanel;
