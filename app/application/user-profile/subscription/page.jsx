import SubscriptionManager from '@/components/user_profile/subscription/SubscriptionManager';
import userProfileService from '@/lib/service/user_profile_service';
import { getUserId } from '@/lib/db/dbServer';

export default async function SubscriptionPage({ searchParams }) {
    const { message } = await searchParams;
    const userId = await getUserId();
    const userProfile = await userProfileService.getUserProfile(userId);
    
    const currentSubscription = userProfile ? {
        plan: userProfile.subscription_plan,
        status: userProfile.subscription_status
    } : null;

    return (
        <SubscriptionManager 
            initialSubscription={currentSubscription}
            message={message}
        />
    );
}
