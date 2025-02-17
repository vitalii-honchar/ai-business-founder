import SubscriptionManager from '@/components/user_profile/subscription/SubscriptionManager';
import PaymentVerification from '@/components/user_profile/subscription/PaymentVerification';
import userProfileService from '@/lib/service/user_profile_service';
import { getUserId } from '@/lib/db/dbServer';
import { SubscriptionPlan, SubscriptionStatus } from '@/lib/domain/user_profile';
import { redirect } from 'next/navigation';

export default async function SubscriptionPage({ searchParams }) {
    const { operation, session_id, message, plan } = await searchParams;
    const userId = await getUserId();
    const userProfile = await userProfileService.getUserProfile(userId);

    let pageMessage = message;

    if (operation === 'success' && session_id) {
        return <PaymentVerification sessionId={session_id} />;
    } else if (operation === 'success' && plan === SubscriptionPlan.FREE) {
        const profile = await userProfileService.getUserProfile(userId);
        profile.subscriptionPlan = SubscriptionPlan.FREE;
        profile.subscriptionStatus = SubscriptionStatus.ACTIVE;

        await userProfileService.updateUserProfile(profile);
        redirect('/');
    }
    
    if (operation === 'cancel') {
        pageMessage = 'Payment was cancelled. Please try again if you want to subscribe.';
    }

    return (
        <SubscriptionManager 
            userProfileObj={userProfile.toObject()}
            message={pageMessage}
        />
    );
}
