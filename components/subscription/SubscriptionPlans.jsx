'use client'

import { useState } from 'react';

const plans = [
    {
        name: 'Free',
        emoji: '🌱',
        description: 'Perfect for testing and small projects',
        price: 0,
        period: 'month',
        features: [
            { text: '3 projects maximum', emoji: '📁' },
            { text: '5 validations per project', emoji: '✓' },
            { text: 'Basic features access', emoji: '🔧' },
        ],
        color: 'blue'
    },
    {
        name: 'Hobby',
        emoji: '🚀',
        description: 'Great for serious founders',
        price: 15,
        period: 'month',
        features: [
            { text: '20 projects maximum', emoji: '📁' },
            { text: 'Unlimited validations per project', emoji: '∞' },
            { text: 'All features access', emoji: '✨' },
        ],
        color: 'indigo',
        popular: true
    },
    {
        name: 'Pro',
        emoji: '⭐',
        description: 'For professional founders',
        price: 25,
        period: 'month',
        features: [
            { text: 'Unlimited projects', emoji: '📁' },
            { text: 'Unlimited validations per project', emoji: '∞' },
            { text: 'All features access', emoji: '✨' },
            { text: 'Priority support', emoji: '🎯' },
        ],
        color: 'green'
    }
];

function PlanCard({ plan, isSelected, onSelect }) {
    // Helper function to get color classes based on plan and selection state
    const getColorClasses = (planName, isSelected) => {
        switch (planName.toLowerCase()) {
            case 'hobby':
                return isSelected 
                    ? 'border-[#8B5CF6] bg-[#F5F3FF]' // Light purple background
                    : 'border-gray-200 bg-white hover:border-gray-300';
            case 'pro':
                return isSelected 
                    ? 'border-[#22C55E] bg-[#F0FDF4]' // Light green background
                    : 'border-gray-200 bg-white hover:border-gray-300';
            default: // free
                return isSelected 
                    ? 'border-[#3B82F6] bg-[#EFF6FF]' // Light blue background
                    : 'border-gray-200 bg-white hover:border-gray-300';
        }
    };

    const getButtonClasses = (planName, isSelected) => {
        switch (planName.toLowerCase()) {
            case 'hobby':
                return isSelected 
                    ? 'bg-[#8B5CF6] text-white' // Purple button
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
            case 'pro':
                return isSelected 
                    ? 'bg-[#22C55E] text-white' // Green button
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
            default: // free
                return isSelected 
                    ? 'bg-[#3B82F6] text-white' // Blue button
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
    };

    const baseClasses = `relative flex flex-col p-6 rounded-2xl transition-all duration-200 border-2 ${
        getColorClasses(plan.name, isSelected)
    } ${isSelected ? 'shadow-lg' : 'hover:shadow-md'}`;

    return (
        <div className={baseClasses}>
            {/* Popular badge */}
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="inline-block bg-[#8B5CF6] rounded-full px-4 py-1 text-xs font-medium text-white shadow-md">
                        Most Popular
                    </div>
                </div>
            )}

            {/* Plan header */}
            <div className="text-center mb-6">
                <div className="text-3xl mb-2">{plan.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                </div>
            </div>

            {/* Features */}
            <div className="flex-grow">
                <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                            <span className="text-lg">{feature.emoji}</span>
                            <span className="text-sm">{feature.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action button */}
            <button
                type="button"
                onClick={() => onSelect(plan.name.toLowerCase())}
                className={`mt-8 w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    getButtonClasses(plan.name, isSelected)
                }`}
            >
                {isSelected ? 'Selected' : 'Choose Plan'}
            </button>
        </div>
    );
}

export default function SubscriptionPlans({ selectedPlan, onPlanSelect }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Select the perfect plan for your needs. All plans include core validation features to help you succeed.
                </p>
            </div>

            {/* Plans grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.name}
                        plan={plan}
                        isSelected={selectedPlan === plan.name.toLowerCase()}
                        onSelect={onPlanSelect}
                    />
                ))}
            </div>
        </div>
    );
}
