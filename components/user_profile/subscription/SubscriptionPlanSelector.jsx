'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import AvailablePlans from './AvailablePlans';
import checkoutApi from '@/lib/client/api/checkout_api';

export default function SubscriptionPlanSelector({ userProfile, onBack }) {
    const [selectedPlan, setSelectedPlan] = useState(userProfile?.subscriptionPlan || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handlePlanSelect = (planName) => {
        setSelectedPlan(planName);
        setError('');
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
            if (selectedPlan === 'free') {
                router.push('/application/user-profile/subscription?operation=success&plan=free');
                return;
            }

            console.log('Creating checkout session...');
            const { url } = await checkoutApi.createCheckoutSession(selectedPlan, userProfile?.subscriptionPlan);
            router.push(url);

        } catch (error) {
            console.error('Subscription error:', error);
            setError(error.message || 'Failed to process subscription. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay isLoading={loading} message="Processing your subscription..." />
            <ErrorMessageComponent message={error} className="mb-6" />
            <AvailablePlans 
                selectedPlan={selectedPlan}
                onPlanSelect={handlePlanSelect}
                currentPlan={userProfile?.isActive ? userProfile.subscriptionPlan : null}
                onBack={onBack}
                loading={loading}
                onSubscribe={handleSubscribe}
            />
        </>
    );
}
