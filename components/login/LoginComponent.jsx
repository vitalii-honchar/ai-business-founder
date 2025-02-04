'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/db/dbClient';
import { useRouter } from 'next/navigation';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import InfoMessageComponent from '@/components/common/InfoMessageComponent';
import { useAuthMessage } from '@/lib/client/hooks/useAuthMessage';
import useLoading from '@/lib/client/hooks/useLoading';
import LoadingOverlay from '@/components/common/LoadingOverlay';

const LoginComponent = ({ tabKey, initialMessage }) => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const { error, setError, info, setInfo, clearMessages } = useAuthMessage();
    const { loading, setLoading } = useLoading();

    // Set initial message when component mounts
    useEffect(() => {
        if (initialMessage) {
            setInfo(initialMessage);
        }
    }, [initialMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);

        const formData = new FormData(e.target);

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: formData.get('email'),
                password: formData.get('password'),
            });

            if (signInError) {
                setError(signInError.message);
                setLoading(false);
                return;
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            setError('An unexpected error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 relative" role="tabpanel" hidden={tabKey !== 'login'}>
            <LoadingOverlay isLoading={loading} message="Logging you in..." />

            <div className={loading ? 'pointer-events-none' : ''}>
                <ErrorMessageComponent className={"mb-4"} message={error} />
                <InfoMessageComponent className={"mb-4"} message={info} />

                <form className="space-y-6" onSubmit={handleSubmit}>
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

                    <div className="text-right">
                        <button
                            type="button"
                            onClick={() => router.push('/login?operation=forgot')}
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                <span className="mr-2">🚀</span> Login
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
