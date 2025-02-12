'use client';

import { useState } from 'react';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import InfoMessageComponent from '@/components/common/InfoMessageComponent';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import CurrentSubscription from './CurrentSubscription';
import AvailablePlans from './AvailablePlans';
import { loadStripe } from '@stripe/stripe-js';
import { UserProfile } from '@/lib/domain/user_profile';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SubscriptionManager({ userProfileObj, message }) {
    const userProfile = new UserProfile(userProfileObj);
    const [selectedPlan, setSelectedPlan] = useState(userProfile?.subscriptionPlan || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState(message || '');
    const [showPlans, setShowPlans] = useState(false);

    const handlePlanSelect = (planName) => {
        setSelectedPlan(planName);
        setError('');
        setInfo('');
    };

    const handleSubscribe = async () => {
        if (!selectedPlan) {
            setError('Please select a plan first');
            return;
        }

        // Don't allow resubscribing to current active plan
        if (userProfile?.isActive && userProfile?.subscriptionPlan === selectedPlan) {
            setError('You are already subscribed to this plan');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plan: selectedPlan,
                    currentPlan: userProfile?.subscriptionPlan
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const { sessionId } = await response.json();
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Subscription error:', error);
            setError('Failed to process subscription: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <LoadingOverlay isLoading={loading} message="Processing your subscription..." />
            
            <div className="max-w-7xl mx-auto">
                <ErrorMessageComponent message={error} className="mb-6" />
                <InfoMessageComponent message={info} className="mb-6" />

                {!showPlans ? (
                    <CurrentSubscription 
                        userProfile={userProfile} 
                        onUpgrade={() => setShowPlans(true)} 
                    />
                ) : (
                    <AvailablePlans 
                        selectedPlan={selectedPlan}
                        onPlanSelect={handlePlanSelect}
                        currentPlan={userProfile?.isActive ? userProfile.subscriptionPlan : null}
                        onBack={() => setShowPlans(false)}
                        loading={loading}
                        onSubscribe={handleSubscribe}
                    />
                )}
            </div>
        </div>
    );
} 