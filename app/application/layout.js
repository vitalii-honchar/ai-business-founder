import Link from 'next/link';
import Image from 'next/image';
import { HiLogout } from 'react-icons/hi';
import { getUserId } from '@/lib/db/dbServer';
import { redirect } from 'next/navigation';
import userProfileService from '@/lib/service/user_profile_service';
import { SubscriptionStatus } from '@/lib/domain/user_profile';
import { headers } from 'next/headers';

export default async function AppLayout({ children }) {
    const userId = await getUserId();
    const isLoggedIn = userId !== null;

    // Get current path from custom header set by middleware
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';

    // List of paths that should bypass subscription check
    const bypassPaths = [
        '/application/user-profile/subscription',
        '/application/auth/logout'
    ];

    // Only check subscription for logged-in users and non-bypassed paths
    if (isLoggedIn && !bypassPaths.some(path => pathname.startsWith(path))) {
        const subscription = await userProfileService.getSubscriptionStatus(userId);
        
        // If no subscription or status is not active, redirect to subscription page
        if (!subscription || subscription.subscriptionStatus !== SubscriptionStatus.ACTIVE) {
            const searchParams = new URLSearchParams();
            
            if (subscription?.subscriptionStatus === SubscriptionStatus.EXPIRED) {
                searchParams.set('message', 'Your subscription has expired. Please renew your plan to continue using the application.');
            } else {
                searchParams.set('message', 'Please choose a subscription plan to continue using the application.');
            }
            
            // Use absolute path for redirect
            const redirectUrl = `/application/user-profile/subscription?${searchParams.toString()}`;
            redirect(redirectUrl);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
            <header className="bg-white shadow">
                <div className="w-full p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4 flex-grow sm:flex-grow-0">
                        <Link href="/" className="text-xl sm:text-2xl font-bold flex items-center gap-2" prefetch={false}>
                            <Image
                                src="/favicon.ico"
                                alt="AI Founder Logo"
                                width={48}
                                height={48}
                                className="w-8 h-8"
                            />
                            AI Founder
                        </Link>
                        {isLoggedIn && (
                            <nav className="hidden sm:flex items-center space-x-4">
                                <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2" prefetch={false}>
                                    <span className="text-xl">🚀</span>
                                    Projects
                                </Link>
                                <Link 
                                    href="/application/user-profile/subscription" 
                                    className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                                >
                                    <span className="text-xl">💳</span>
                                    Subscription
                                </Link>
                            </nav>
                        )}
                    </div>

                    <Link
                        href="https://forms.gle/8ENaz7dhUGqUSN688"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg items-center gap-2 transition-colors"
                    >
                        <span className="text-xl">💬</span>
                        <span className="inline">Send Feedback</span>
                    </Link>

                    {/* Feedback button - visible on both mobile and desktop */}
                    <div className="ml-2 flex items-center gap-4">
                        {isLoggedIn ? (
                            <Link href="/application/auth/logout" className="flex text-gray-600 hover:text-gray-900 items-center gap-2">
                                Sign Out
                                <HiLogout className="w-5 h-5" />
                            </Link>
                        ) : (
                            <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base transition-colors">
                                <span className="text-xl">👤</span>
                                <span>Sign In / Sign Up</span>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <main className="flex-grow w-full px-2 sm:px-4 py-4">
                {/* Only show subscription check message on protected pages */}
                {isLoggedIn && !bypassPaths.some(path => pathname.startsWith(path)) && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
                        <p className="font-medium">🔔 Open Beta Testing</p>
                        <p className="mt-1">This is an open beta version of AI Founder. Please be aware that you may encounter bugs or incomplete features. All data created during the beta period may be deleted after the testing phase. Your feedback is valuable to us!</p>
                        <p className="mt-2">
                            <Link href="https://forms.gle/8ENaz7dhUGqUSN688" className="underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">Send us your feedback</Link>
                        </p>
                    </div>
                )}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                    {children}
                </div>
            </main>
            <footer className="bg-white shadow mt-4">
                <div className="w-full px-2 sm:px-4 py-4 text-center flex flex-col items-center gap-4">
                    {!isLoggedIn && (
                        <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-base transition-colors">
                            <span className="text-xl">👤</span>
                            <span>Sign In / Sign Up</span>
                        </Link>
                    )}
                    <Link
                        href="https://forms.gle/8ENaz7dhUGqUSN688"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <span className="text-xl">💬</span>
                        Send Feedback
                    </Link>
                    <p className="text-xs sm:text-sm">&copy; 2025 AI Founder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}