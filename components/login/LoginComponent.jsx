'use client';
import { useState } from 'react';
import { createClient } from '@/lib/db/dbClient';
import { useRouter } from 'next/navigation';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import InfoMessageComponent from '@/components/common/InfoMessageComponent';
import { useAuthMessage } from '@/lib/client/hooks/useAuthMessage';

const LoginComponent = ({ tabKey }) => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const { error, setError, info, setInfo, clearMessages } = useAuthMessage();

    const handleSubmit = async (formData) => {
        clearMessages();

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        if (signInError) {
            setError(signInError.message);
            return;
        }

        router.push('/');
        router.refresh();
    };

    return (
        <div className="space-y-6" role="tabpanel" hidden={tabKey !== 'login'}>
            <ErrorMessageComponent message={error} />
            <InfoMessageComponent message={info} />

            <form className="space-y-6" action={handleSubmit}>
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
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginComponent;
