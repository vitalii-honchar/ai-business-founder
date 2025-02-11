import { SubscriptionPlan, PlanLimits } from '@/lib/domain/user_profile';

export const SUBSCRIPTION_PLANS = {
    [SubscriptionPlan.FREE]: {
        name: 'Free',
        emoji: '🌱',
        description: 'Perfect for testing and small projects',
        price: 0,
        period: 'month',
        features: [
            { text: `Up to ${PlanLimits[SubscriptionPlan.FREE].maxProjects} projects`, emoji: '📁' },
            { text: `${PlanLimits[SubscriptionPlan.FREE].validationsPerProject} validations per project`, emoji: '✓' },
            { text: 'Basic AI features', emoji: '🔧' },
            { text: 'Community support', emoji: '👥' }
        ],
        color: 'blue'
    },
    [SubscriptionPlan.HOBBY]: {
        name: 'Hobby',
        emoji: '🚀',
        description: 'For serious founders',
        price: 15,
        period: 'month',
        features: [
            { text: `Up to ${PlanLimits[SubscriptionPlan.HOBBY].maxProjects} projects`, emoji: '📁' },
            { text: 'Unlimited validations per project', emoji: '∞' },
            { text: 'Advanced AI features', emoji: '✨' },
            { text: 'Priority support', emoji: '🎯' }
        ],
        color: 'purple',
        popular: true
    },
    [SubscriptionPlan.PRO]: {
        name: 'Pro',
        emoji: '⭐',
        description: 'For professional founders',
        price: 25,
        period: 'month',
        features: [
            { text: 'Unlimited projects', emoji: '📁' },
            { text: 'Unlimited validations per project', emoji: '∞' },
            { text: 'Advanced AI features', emoji: '✨' },
            { text: 'Priority support', emoji: '🎯' },
            { text: 'Custom project templates', emoji: '📋' },
            { text: 'Team collaboration tools', emoji: '👥' }
        ],
        color: 'green'
    }
};

export const getColorClasses = (planName, isSelected) => {
    const colors = {
        [SubscriptionPlan.FREE]: {
            selected: 'border-[#3B82F6] bg-[#EFF6FF]',
            default: 'border-gray-200 bg-white hover:border-gray-300'
        },
        [SubscriptionPlan.HOBBY]: {
            selected: 'border-[#8B5CF6] bg-[#F5F3FF]',
            default: 'border-gray-200 bg-white hover:border-gray-300'
        },
        [SubscriptionPlan.PRO]: {
            selected: 'border-[#22C55E] bg-[#F0FDF4]',
            default: 'border-gray-200 bg-white hover:border-gray-300'
        }
    };

    const planColors = colors[planName] || colors[SubscriptionPlan.FREE];
    return isSelected ? planColors.selected : planColors.default;
};

export const getButtonClasses = (planName, isSelected) => {
    const colors = {
        [SubscriptionPlan.FREE]: {
            selected: 'bg-[#3B82F6] text-white',
            default: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        },
        [SubscriptionPlan.HOBBY]: {
            selected: 'bg-[#8B5CF6] text-white',
            default: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        },
        [SubscriptionPlan.PRO]: {
            selected: 'bg-[#22C55E] text-white',
            default: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
    };

    const planColors = colors[planName] || colors[SubscriptionPlan.FREE];
    return isSelected ? planColors.selected : planColors.default;
}; 