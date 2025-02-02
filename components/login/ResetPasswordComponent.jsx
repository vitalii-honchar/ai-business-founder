'use client';
import { useState } from 'react';
import { createClient } from '@/lib/db/dbClient';
import { useRouter } from 'next/navigation';

const ResetPasswordComponent = ({ code }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (formData) => {
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      router.push(`/login?error_description=${encodeURIComponent('Passwords do not match')}&operation=reset&code=${code}`);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      router.push(`/login?error_description=${encodeURIComponent(error.message)}&operation=reset&code=${code}`);
      return;
    }

    router.push('/login?info=' + encodeURIComponent('Password has been updated successfully. Please login with your new password.'));
  };

  return (
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
  );
};

export default ResetPasswordComponent;
