import React from 'react';

const TabComponent = ({ activeTab, tabs, onTabChange, children }) => {
  // Convert children to array to handle both single and multiple children
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-2 px-4 ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div>
        {childrenArray.map((child) => {
          // Only render the child component if its tabKey matches activeTab
          return child.props.tabKey === activeTab ? child : null;
        })}
      </div>
    </div>
  );
};

export default TabComponent;
