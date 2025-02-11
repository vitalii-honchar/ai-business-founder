'use client';

import { useState, useEffect } from 'react';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import InfoMessageComponent from '@/components/common/InfoMessageComponent';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import userProfileApi from '@/lib/client/api/user_profile_api';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SubscriptionManager({ initialSubscription, message }) {
    const [selectedPlan, setSelectedPlan] = useState(initialSubscription?.plan || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState(message || '');
    const [currentSubscription, setCurrentSubscription] = useState(initialSubscription);

    const handlePlanSelect = async (planName) => {
        setSelectedPlan(planName);
        setError('');
        setInfo('');
    };

    const handleSubscribe = async () => {
        if (!selectedPlan) {
            setError('Please select a plan first');
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
                    currentPlan: currentSubscription?.plan
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

                {currentSubscription && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Current Subscription</h3>
                        <p className="text-gray-600">
                            Plan: <span className="font-medium capitalize">{currentSubscription.plan}</span>
                        </p>
                        <p className="text-gray-600">
                            Status: <span className="font-medium capitalize">{currentSubscription.status}</span>
                        </p>
                    </div>
                )}

                <SubscriptionPlans 
                    selectedPlan={selectedPlan} 
                    onPlanSelect={handlePlanSelect} 
                />

                {selectedPlan && selectedPlan !== 'free' && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleSubscribe}
                            disabled={loading}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <span className="text-xl mr-2">💳</span>
                                    Subscribe Now
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 