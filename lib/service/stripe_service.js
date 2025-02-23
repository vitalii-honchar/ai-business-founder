import { stripe } from '@/lib/stripe';
import logger from '@/lib/logger';
import userProfileService from './user_profile_service';
import { SubscriptionStatus, Usage } from '@/lib/domain/user_profile';

const PRICE_IDS = {
    hobby: process.env.STRIPE_HOBBY_PRICE_ID,
    pro: process.env.STRIPE_PRO_PRICE_ID,
};


const createStripeService = () => {
    const createOrRetrieveCustomer = async (user) => {
        const log = logger.child({ userId: user.id });
        
        try {
            // First check if user already has a Stripe customer ID
            const userProfile = await userProfileService.getUserProfile(user.id);

            if (userProfile.stripeCustomerId) {
                log.info({ customerId: userProfile.stripeCustomerId }, 'Retrieved existing Stripe customer');
                return userProfile.stripeCustomerId;
            }
            // Create new customer
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: {
                    userId: user.id
                }
            });

            userProfile.stripeCustomerId = customer.id;
            // Save customer ID to user profile
            await userProfileService.updateUserProfile(userProfile);

            log.info({ customerId: customer.id }, 'Created new Stripe customer');
            return customer.id;
        } catch (error) {
            console.error(error);
            log.error({ error: error.message }, 'Failed to create/retrieve Stripe customer');
            throw error;
        }
    };

    const createCheckoutSession = async ({ user, plan, currentPlan }) => {
        const log = logger.child({ userId: user.id, plan, currentPlan });
        log.info('Creating Stripe checkout session');

        if (!PRICE_IDS[plan]) {
            throw new Error('Invalid plan selected');
        }

        try {
            // Always ensure we have a customer
            const customerId = await createOrRetrieveCustomer(user);
            
            // Log the session configuration for debugging
            const sessionConfig = {
                customer: customerId,
                line_items: [
                    {
                        price: PRICE_IDS[plan],
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${process.env.NEXT_PUBLIC_API_URL}/application/user-profile/subscription?operation=success&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/application/user-profile/subscription?operation=cancel&plan=${plan}`,
                metadata: {
                    userId: user.id,
                    email: user.email,
                    plan,
                    previousPlan: currentPlan || 'none'
                },
            };

            console.log('Creating checkout session with config:', {
                ...sessionConfig,
                customer: customerId.substring(0, 8) + '...',
                price: PRICE_IDS[plan].substring(0, 8) + '...'
            });

            const session = await stripe.checkout.sessions.create(sessionConfig);
            
            // Log the created session ID
            console.log('Created checkout session:', session.id);
            
            log.info({ sessionId: session.id }, 'Checkout session created');
            return session;
        } catch (error) {
            console.error('Stripe error details:', error);
            log.error({ error: error.message, stack: error.stack }, 'Failed to create checkout session');
            throw error;
        }
    };

    const handleWebhookEvent = async (event) => {
        logger.info({ eventType: event.type }, 'Processing Stripe webhook event');

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const { userId, plan } = session.metadata;

                logger.info({ userId, plan }, 'Processing successful checkout');

                const userProfile = await userProfileService.getUserProfile(userId);
                await userProfileService.updateUserProfile(userId, {
                    ...userProfile.toObject(),
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

                const userProfile = await userProfileService.getUserProfileByStripeCustomerId(customerId);
                if (!userProfile) {
                    logger.error({ customerId }, 'User profile not found for stripe customer');
                    return;
                }

                const status = subscription.status === 'active' 
                    ? SubscriptionStatus.ACTIVE 
                    : SubscriptionStatus.EXPIRED;

                await userProfileService.updateUserProfile(userProfile.id, {
                    ...userProfile.toObject(),
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
                    ...userProfile.toObject(),
                    subscription_status: SubscriptionStatus.CANCELLED,
                    stripe_subscription_id: null // Clear the subscription ID
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

    const verifyCheckoutSession = async (sessionId) => {
        const log = logger.child({ sessionId });
        log.info('Verifying checkout session');

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            log.info({ paymentStatus: session.payment_status }, 'Session retrieved');

            // If payment is successful, update the user's subscription
            if (session.payment_status === 'paid') {
                const userProfile = await userProfileService.getUserProfile(session.metadata.userId);
                userProfile.stripeSubscriptionId = session.subscription;
                userProfile.subscriptionPlan = session.metadata.plan;
                
                await userProfileService.activateSubscription(userProfile);
            }

            return session;
        } catch (error) {
            log.error({ error: error.message }, 'Failed to verify checkout session');
            throw error;
        }
    };

    return {
        createCheckoutSession,
        handleWebhookEvent,
        constructWebhookEvent,
        createOrRetrieveCustomer,
        verifyCheckoutSession,
    };
};

export default createStripeService();
