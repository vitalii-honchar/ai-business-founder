'use client';
import { useState } from 'react';
import { createClient } from '@/lib/db/dbClient';
import { useAuthMessage } from '@/lib/client/hooks/useAuthMessage';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import InfoMessageComponent from '@/components/common/InfoMessageComponent';

const ResetPasswordComponent = ({ code, errorMessage }) => {
    const [showPassword, setShowPassword] = useState(false);
    const supabase = createClient();
    const { error, setError, info, setInfo, clearMessages } = useAuthMessage({ errorMessage });

    const handleSubmit = async (formData) => {
        clearMessages();

        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
            password: password
        });

        if (updateError) {
            setError(updateError.message);
            return;
        }

        setInfo('Password has been updated successfully. Please login with your new password.');
    };

    return (
        <div className="space-y-6">
            <ErrorMessageComponent message={error} />
            <InfoMessageComponent message={info} />

            <form className="space-y-6" action={handleSubmit}>
                <input type="hidden" name="code" value={code || ''} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                        New Password
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
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordComponent;
