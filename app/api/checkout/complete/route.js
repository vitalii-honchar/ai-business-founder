import { NextResponse } from 'next/server';
import stripeService from '@/lib/service/stripe_service';
import userProfileService from '@/lib/service/user_profile_service';
import { SubscriptionStatus } from '@/lib/domain/user_profile';
import logger from '@/lib/logger';

export async function POST(request) {
    try {
        const { sessionId } = await request.json();
        
        console.dir(sessionId, { depth: null });

        if (!sessionId) {
            return NextResponse.json(
                { success: false, reason: 'Session ID is required' },
                { status: 400 }
            );
        }

        // Verify the checkout session
        const session = await stripeService.verifyCheckoutSession(sessionId);

        console.dir(session, { depth: null });
        
        if (session.payment_status !== 'paid') {
            return NextResponse.json(
                { success: false, reason: 'Payment is incomplete' },
                { status: 200 }
            );
        }

        // Get user profile and update subscription details
        const userProfile = await userProfileService.getUserProfile(session.metadata.userId);
        userProfile.stripeSubscriptionId = session.subscription;
        userProfile.subscriptionStatus = SubscriptionStatus.ACTIVE;
        userProfile.subscriptionPlan = session.metadata.plan;
        
        await userProfileService.updateUserProfile(userProfile);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        logger.error({ error }, 'Failed to complete checkout');
        return NextResponse.json(
            { success: false, reason: 'Failed to process payment completion' },
            { status: 500 }
        );
    }
}
