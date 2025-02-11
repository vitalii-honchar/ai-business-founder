import { SubscriptionPlan } from '@/lib/service/user_profile_service';

const userProfileApi = {
    async createUserProfile(userId, subscriptionPlan) {
        const response = await fetch(`/api/user-profile/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscription_plan: subscriptionPlan
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create user profile');
        }

        return response.json();
    },

    async updateUserProfile(userId, profileData) {
        const response = await fetch(`/api/user-profile/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update user profile');
        }

        return response.json();
    }
};

export default userProfileApi;
