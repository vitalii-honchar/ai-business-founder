const navigationItems = [
    {
        title: 'Validation',
        id: 'validation',
        subItems: [
            {
                title: 'HWW',
                id: 'hww'
            },
            {
                title: 'TAM-SAM-SOM',
                id: 'tam-sam-som'
            }
        ]
    },
    {
        title: 'User Research',
        id: 'user-research',
        subItems: [
            {
                title: 'Interviews',
                id: 'interviews'
            },
            {
                title: 'Surveys',
                id: 'surveys'
            }
        ]
    },
    {
        title: 'Customer Journey Map',
        id: 'journey-map',
        subItems: [
            {
                title: 'Touchpoints',
                id: 'touchpoints'
            },
            {
                title: 'Pain Points',
                id: 'pain-points'
            }
        ]
    }
];

const NavigationPanel = ({ onNavigate, activeItem }) => {
    return (
        <nav className="p-4">
            {navigationItems.map((item) => (
                <div key={item.id} className="mb-2">
                    <div
                        className={`
              py-2 px-3 rounded-md cursor-pointer
              hover:bg-gray-100 transition-colors
              ${activeItem.itemId === item.id ? 'bg-blue-50 text-blue-600' : ''}
            `}
                        onClick={() => onNavigate({ itemId: item.id, subItemId: item.subItems[0].id })}
                    >
                        {item.title}
                    </div>
                    {item.subItems && activeItem.itemId === item.id && (
                        <div className="pl-6 mt-1">
                            {item.subItems.map((subItem) => (
                                <div
                                    key={subItem.id}
                                    className={`
                    py-1.5 px-3 rounded-md cursor-pointer
                    text-sm text-gray-600
                    hover:bg-gray-50 hover:text-gray-900
                    transition-colors
                    ${activeItem.subItemId === subItem.id ? 'bg-blue-50 text-blue-600' : ''}
                  `}
                                    onClick={() => onNavigate({ itemId: item.id, subItemId: subItem.id })}
                                >
                                    {subItem.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default NavigationPanel;
