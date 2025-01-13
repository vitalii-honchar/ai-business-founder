import React from 'react';

const NavigationPanel = ({ activeStep, onStepChange }) => {
    const steps = [
        { name: 'Validation', description: 'Validate your project idea' },
        { name: 'User Research', description: 'Research your target users' },
        // { name: 'Solution Generation', description: 'Generate solution ideas' },
        { name: 'Customer Journey Map', description: 'Map the customer journey' },
        // { name: 'Prototype', description: 'Create a prototype' },
        // { name: 'Usability Testing', description: 'Test with users' },
        // { name: 'Business Model Canvas', description: 'Define business model' },
        // { name: 'Value Proposition Statement', description: 'Define value proposition' },
    ]

    return (
        <nav className="space-y-6">
            {steps.map((step) => (
                <button
                    key={step.name}
                    onClick={() => onStepChange(step.name)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${activeStep === step.name
                        ? 'bg-purple-50 text-purple-600'
                        : 'hover:bg-gray-50'
                        }`}
                >
                    <h4 className="font-medium">{step.name}</h4>
                    <p className="text-sm text-gray-500">{step.description}</p>
                </button>
            ))}
        </nav>
    )
}

export default NavigationPanel;
