'use client';
import { useState } from 'react';
import { createClient } from '@/lib/db/dbClient';
import { useAuthMessage } from '@/lib/client/hooks/useAuthMessage';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import InfoMessageComponent from '@/components/common/InfoMessageComponent';
import useLoading from '@/lib/client/hooks/useLoading';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import userProfileApi from '@/lib/client/api/user_profile_api';

const RegisterComponent = ({ tabKey, onSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('free');
    const supabase = createClient();
    const { error, setError, info, setInfo, clearMessages } = useAuthMessage();
    const { loading, setLoading } = useLoading();

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);

        const formData = new FormData(e.target);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const email = formData.get('email');

        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                setLoading(false);
                return;
            }

            // Sign up the user without email confirmation
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        subscription_plan: selectedPlan
                    },
                },
            });

            console.dir(data)

            if (signUpError) {
                console.error('Signup error:', signUpError);
                setError(signUpError.message || 'Failed to sign up. Please try again later.');
                setLoading(false);
                return;
            }

            if (!data?.user?.id) {
                console.error('No user ID returned from signup');
                setError('User creation failed - no user ID returned. Please try again later.');
                setLoading(false);
                return;
            }

            try {
                // Create a user profile in NEW state so we can promote subscription upgrades
                await userProfileApi.createUserProfile(data.user.id, selectedPlan);
                
                // Sign in the user immediately without waiting for email confirmation
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) {
                    console.error('Sign-in error after registration:', signInError);
                    setError(signInError.message || 'Account created but login failed. Please try logging in manually.');
                    setLoading(false);
                    return;
                }

                // Set registration complete status for tracking purposes
                setIsRegistered(true);
                
                // If we have an onSuccess callback, call it
                onSuccess?.();
                
                // Redirect to home page
                window.location.href = '/';
            } catch (error) {
                console.error('Failed to create user profile:', error);
                setError('Failed to create user profile: ' + error.message);
                setLoading(false);
                return;
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('An unexpected error occurred during registration');
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 relative" role="tabpanel" hidden={tabKey !== 'register'}>
            <LoadingOverlay isLoading={loading} message="Creating your account..." />

            <InfoMessageComponent className={"mb-4"} message={info} />

            {!isRegistered && (
                <div className={loading ? 'pointer-events-none' : ''}>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Subscription Plans */}
                        <div className="mb-8">
                            <SubscriptionPlans 
                                selectedPlan={selectedPlan}
                                onPlanSelect={setSelectedPlan}
                            />
                        </div>
                        {/* Registration Details Section */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your Account</h3>
                                <p className="text-sm text-gray-600">
                                    Enter your details to get started with your {selectedPlan} plan
                                </p>
                            </div>
                            <ErrorMessageComponent className={"mb-4"} message={error} />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                                    Email
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">📧</span>
                                    <input
                                        name="email"
                                        type="email"
                                        id="email"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔒</span>
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? '👁️‍🗨️' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔒</span>
                                    <input
                                        name="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <span className="mr-2">✨</span> Create Account
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default RegisterComponent;
