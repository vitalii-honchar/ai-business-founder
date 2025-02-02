'use client';
import { createClient } from '@/lib/db/dbClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ForgotPasswordComponent = () => {
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (formData) => {
    const email = formData.get('email');
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/login?operation=reset`,
    });

    if (error) {
      router.push(`/login?error_description=${encodeURIComponent(error.message)}`);
      return;
    }

    router.push('/login?info=' + encodeURIComponent('If an account exists with this email, you will receive a password reset link.'));
  };

  return (
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
      
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Send Reset Link
      </button>
      
      <Link
        href="/login"
        className="block w-full text-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        Back to Login
      </Link>
    </form>
  );
};

export default ForgotPasswordComponent;
