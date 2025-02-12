import { SUBSCRIPTION_PLANS } from '@/components/subscription/subscription_plans_config';
import { UserProfile } from '@/lib/domain/user_profile';
import { SubscriptionStatus } from '@/lib/domain/user_profile';

export default function CurrentSubscription({ userProfile, onUpgrade }) {
    const getStatusBadgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case SubscriptionStatus.ACTIVE:
                return 'bg-green-100 text-green-800 border-green-200';
            case SubscriptionStatus.EXPIRED:
                return 'bg-red-100 text-red-800 border-red-200';
            case SubscriptionStatus.CANCELLED:
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    if (!userProfile) return null;

    const planDetails = SUBSCRIPTION_PLANS[userProfile.subscriptionPlan] || {
        emoji: '📦',
        name: userProfile.subscriptionPlan || 'No Plan',
        features: []
    };

    const buttonConfig = userProfile.buttonConfig;

    return (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" role="img" aria-label="Plan emoji">
                    {planDetails.emoji}
                </span>
                <h3 className="text-lg font-semibold">
                    {userProfile.isNew ? 'Start Your Subscription' : 'Current Subscription'}
                </h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Plan</span>
                    <div className="flex items-center gap-2">
                        <span className="font-medium capitalize bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                            {planDetails.name}
                        </span>
                    </div>
                </div>
                {!userProfile.isNew && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className={`font-medium capitalize px-3 py-1 rounded-full border ${getStatusBadgeColor(userProfile.subscriptionStatus)}`}>
                            {userProfile.isActive ? '✅ ' : userProfile.isExpired ? '⚠️ ' : '❌ '}
                            {userProfile.subscriptionStatus}
                        </span>
                    </div>
                )}
            </div>

            {planDetails.features.length > 0 && (
                <div className="mt-6 border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                        {userProfile.isNew ? 'Free Plan Features:' : 'Your Current Features:'}
                    </h4>
                    <ul className="space-y-2">
                        {planDetails.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">{feature.emoji}</span>
                                {feature.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {buttonConfig && (
                <div className="mt-6 border-t border-gray-100 pt-6">
                    <div className="flex flex-col items-center gap-3">
                        <button
                            onClick={onUpgrade}
                            className={`group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white transition-all duration-200 bg-gradient-to-r ${buttonConfig.gradient} rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                        >
                            <span className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="flex items-center gap-2">
                                <span role="img" aria-label="rocket" className="text-xl">🚀</span>
                                Get started with a subscription
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 