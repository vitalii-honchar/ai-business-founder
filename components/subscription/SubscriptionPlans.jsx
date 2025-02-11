'use client'

import { SUBSCRIPTION_PLANS, getColorClasses, getButtonClasses } from './subscription_plans_config';
import { SubscriptionPlan } from '@/lib/domain/user_profile';

function PlanCard({ plan, planId, isSelected, onSelect }) {
    const baseClasses = `relative flex flex-col p-6 rounded-2xl transition-all duration-200 border-2 ${
        getColorClasses(planId, isSelected)
    } ${isSelected ? 'shadow-lg' : 'hover:shadow-md'}`;

    return (
        <div className={baseClasses}>
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="inline-block bg-[#8B5CF6] rounded-full px-4 py-1 text-xs font-medium text-white shadow-md">
                        Most Popular
                    </div>
                </div>
            )}

            <div className="text-center mb-6">
                <div className="text-3xl mb-2">{plan.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
            </div>

            <div className="text-center mb-6">
                <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                </div>
            </div>

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

            <button
                type="button"
                onClick={() => onSelect(planId)}
                className={`mt-8 w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    getButtonClasses(planId, isSelected)
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
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Select the perfect plan for your needs. All plans include core validation features to help you succeed.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {Object.entries(SUBSCRIPTION_PLANS).map(([planId, plan]) => (
                    <PlanCard
                        key={planId}
                        planId={planId}
                        plan={plan}
                        isSelected={selectedPlan === planId}
                        onSelect={onPlanSelect}
                    />
                ))}
            </div>
        </div>
    );
}
