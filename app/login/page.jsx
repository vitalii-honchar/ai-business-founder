"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/db/dbClient';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        Cookies.set('access_token', session.access_token);
        Cookies.set('refresh_token', session.refresh_token);
        router.push('/dashboard');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    console.log('Email:', email);
    console.log('Password:', password);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error during sign in:', error);
      setError(error.message);
    } else {
      console.log('Sign in successful, redirecting to dashboard');
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <button
            onClick={handleRegister}
            className="w-full px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;