import { redirect } from 'next/navigation';
import { getUserId } from '@/lib/db/dbServer';
import userProfileService from '@/lib/service/user_profile_service';
import { SubscriptionStatus, SubscriptionPlan } from '@/lib/domain/user_profile';

export default async function SubscriptionCheck({ pathname, shouldBypass, children }) {
    const userId = await getUserId();
    const isLoggedIn = userId != null;

    // Only check subscription for logged-in users and non-bypassed paths
    if (isLoggedIn && !shouldBypass) {
        let userProfile = await userProfileService.getUserProfile(userId);
        if (!userProfile) {
            userProfile = await userProfileService.createUserProfile(userId, {
                subscription_plan: SubscriptionPlan.FREE,
                subscription_status: SubscriptionStatus.NEW
            });
        }

        if (!userProfile?.isActive) {
            const searchParams = new URLSearchParams();
            
            if (userProfile?.subscriptionStatus === SubscriptionStatus.EXPIRED) {
                searchParams.set('message', 'Your subscription has expired. Please renew your plan to continue using the application.');
            } else if (!userProfile || !userProfile.subscriptionPlan) {
                searchParams.set('message', 'Please choose a subscription plan to continue using the application.');
            } else {
                searchParams.set('message', 'Your subscription is not active. Please check your subscription status.');
            }
            
            // Use absolute path for redirect
            const redirectUrl = `/application/user-profile/subscription?${searchParams.toString()}`;
            redirect(redirectUrl);
        }
    }

    return children;
} 