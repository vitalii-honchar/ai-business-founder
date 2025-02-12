import { SUBSCRIPTION_PLANS } from '@/components/subscription/subscription_plans_config';
import { UserProfile } from '@/lib/domain/user_profile';

export default function CurrentSubscription({ userProfile }) {
    const getStatusBadgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'expired':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    if (!userProfile) return null;

    const planDetails = SUBSCRIPTION_PLANS[userProfile.subscriptionPlan] || {
        emoji: '📦',
        name: userProfile.subscriptionPlan,
        features: []
    };

    return (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" role="img" aria-label="Plan emoji">
                    {planDetails.emoji}
                </span>
                <h3 className="text-lg font-semibold">Current Subscription</h3>
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
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-medium capitalize px-3 py-1 rounded-full border ${getStatusBadgeColor(userProfile.subscriptionStatus)}`}>
                        {userProfile.subscriptionStatus === 'active' ? '✅ ' : userProfile.subscriptionStatus === 'expired' ? '⚠️ ' : '❌ '}
                        {userProfile.subscriptionStatus}
                    </span>
                </div>
            </div>

            {planDetails.features.length > 0 && (
                <div className="mt-6 border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Your Current Features:</h4>
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
            
            {userProfile.subscriptionStatus === 'active' && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-xl">💡</span>
                    <p>To change your plan, select a new plan below</p>
                </div>
            )}
            {userProfile.subscriptionStatus === 'expired' && (
                <div className="mt-4 flex items-center gap-2 text-sm text-red-600">
                    <span className="text-xl">⚠️</span>
                    <p>Your subscription has expired. Please renew or choose a new plan below</p>
                </div>
            )}
            {userProfile.subscriptionStatus === 'cancelled' && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-xl">📝</span>
                    <p>Your subscription has been cancelled. Select a plan below to resubscribe</p>
                </div>
            )}
        </div>
    );
} 