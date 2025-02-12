import SubscriptionManager from '@/components/user_profile/subscription/SubscriptionManager';
import userProfileService from '@/lib/service/user_profile_service';
import { getUserId } from '@/lib/db/dbServer';

export default async function SubscriptionPage({ searchParams }) {
    const { message } = await searchParams;
    const userId = await getUserId();
    const userProfile = await userProfileService.getUserProfile(userId);

    return (
        <SubscriptionManager 
            userProfileObj={userProfile.toObject()}
            message={message}
        />
    );
}
