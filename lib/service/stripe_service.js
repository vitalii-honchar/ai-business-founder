import { stripe } from '@/lib/stripe';
import logger from '@/lib/logger';
import userProfileService from './user_profile_service';
import { SubscriptionStatus } from '@/lib/domain/user_profile';

const PRICE_IDS = {
    hobby: process.env.STRIPE_HOBBY_PRICE_ID,
    pro: process.env.STRIPE_PRO_PRICE_ID,
};

const createStripeService = () => {
    const createCheckoutSession = async ({ userId, plan, currentPlan }) => {
        logger.info({ userId, plan, currentPlan }, 'Creating Stripe checkout session');

        if (!PRICE_IDS[plan]) {
            throw new Error('Invalid plan selected');
        }

        try {
            const session = await stripe.checkout.sessions.create({
                customer_email: userId,
                line_items: [
                    {
                        price: PRICE_IDS[plan],
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${process.env.NEXT_PUBLIC_API_URL}/application?success=true`,
                cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/application/user-profile/subscription?canceled=true`,
                metadata: {
                    userId,
                    plan,
                    previousPlan: currentPlan || 'none'
                },
            });

            logger.info({ sessionId: session.id }, 'Checkout session created');
            return session;
        } catch (error) {
            logger.error({ error, userId, plan }, 'Failed to create checkout session');
            throw new Error('Failed to create checkout session');
        }
    };

    const handleWebhookEvent = async (event) => {
        logger.info({ eventType: event.type }, 'Processing Stripe webhook event');

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const { userId, plan } = session.metadata;

                logger.info({ userId, plan }, 'Processing successful checkout');

                await userProfileService.updateUserProfile(userId, {
                    subscription_plan: plan,
                    subscription_status: SubscriptionStatus.ACTIVE,
                    stripe_customer_id: session.customer,
                    stripe_subscription_id: session.subscription,
                });

                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                const customerId = subscription.customer;

                logger.info({ customerId }, 'Processing subscription update');

                // Get user profile by stripe customer ID
                const userProfile = await userProfileService.getUserProfileByStripeCustomerId(customerId);
                if (!userProfile) {
                    logger.error({ customerId }, 'User profile not found for stripe customer');
                    return;
                }

                const status = subscription.status === 'active' 
                    ? SubscriptionStatus.ACTIVE 
                    : SubscriptionStatus.EXPIRED;

                await userProfileService.updateUserProfile(userProfile.id, {
                    subscription_status: status,
                });

                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                const customerId = subscription.customer;

                logger.info({ customerId }, 'Processing subscription deletion');

                const userProfile = await userProfileService.getUserProfileByStripeCustomerId(customerId);
                if (!userProfile) {
                    logger.error({ customerId }, 'User profile not found for stripe customer');
                    return;
                }

                await userProfileService.updateUserProfile(userProfile.id, {
                    subscription_status: SubscriptionStatus.CANCELLED,
                });

                break;
            }

            default:
                logger.info({ eventType: event.type }, 'Unhandled webhook event');
        }
    };

    const constructWebhookEvent = (payload, signature) => {
        try {
            return stripe.webhooks.constructEvent(
                payload,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (error) {
            logger.error({ error }, 'Error constructing webhook event');
            throw new Error('Invalid webhook signature');
        }
    };

    return {
        createCheckoutSession,
        handleWebhookEvent,
        constructWebhookEvent,
    };
};

export default createStripeService();
