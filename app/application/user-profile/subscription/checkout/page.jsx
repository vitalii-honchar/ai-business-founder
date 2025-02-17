import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUserId } from '@/lib/db/dbServer';
import userProfileService from '@/lib/service/user_profile_service';
import stripeService from '@/lib/service/stripe_service';
import { SUBSCRIPTION_PLANS } from '@/components/subscription/subscription_plans_config';
import { getStripe } from '@/lib/client/stripe';

export default async function CheckoutPage() {
    const userId = await getUserId();
    if (!userId) {
        redirect('/login');
    }

    const userProfile = await userProfileService.getUserProfile(userId);
    if (!userProfile?.subscriptionPlan) {
        redirect('/application/user-profile/subscription');
    }

    const planDetails = SUBSCRIPTION_PLANS[userProfile.subscriptionPlan] || {
        name: userProfile.subscriptionPlan,
        price: 'N/A',
        emoji: '📦'
    };

    async function createCheckoutSession() {
        'use server';
        
        try {
            const session = await stripeService.createCheckoutSession({
                userId,
                plan: userProfile.subscriptionPlan,
                currentPlan: userProfile.subscriptionPlan
            });

            return session.id;
        } catch (error) {
            console.error('Checkout error:', error);
            throw error;
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <Link 
                    href="/application/user-profile/subscription"
                    className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                    <span>←</span>
                    Back to plans
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl" role="img" aria-label="Checkout emoji">
                        💳
                    </span>
                    <h1 className="text-2xl font-semibold">Checkout</h1>
                </div>

                <div className="space-y-6">
                    {/* Selected Plan */}
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{planDetails.emoji}</span>
                            <div>
                                <h3 className="font-medium capitalize">{planDetails.name} Plan</h3>
                                <p className="text-sm text-gray-600">Selected subscription plan</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">${planDetails.price}/mo</p>
                        </div>
                    </div>

                    {/* Features List */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Included in your plan:</h3>
                        <ul className="space-y-2">
                            {planDetails.features?.map((feature, index) => (
                                <li key={index} className="flex items-center text-sm text-gray-600">
                                    <span className="mr-2">{feature.emoji}</span>
                                    {feature.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Checkout Button */}
                    <form action={async () => {
                        'use server';
                        const sessionId = await createCheckoutSession();
                        const stripe = await getStripe();
                        await stripe.redirectToCheckout({ sessionId });
                    }}>
                        <button
                            type="submit"
                            className="w-full group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <span className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="flex items-center gap-2">
                                <span role="img" aria-label="credit card" className="text-xl">💳</span>
                                Proceed to payment
                            </span>
                        </button>
                    </form>

                    {/* Security Note */}
                    <p className="text-sm text-gray-500 text-center mt-4">
                        <span role="img" aria-label="secure" className="mr-2">🔒</span>
                        Secure payment processed by Stripe
                    </p>
                </div>
            </div>
        </div>
    );
}
