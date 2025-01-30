'use client';
import { login, signup } from "./actions";
import { useState, use } from "react";
import Link from 'next/link';

const LoginPage = ({ searchParams }) => {
  const params = use(searchParams);
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const errorMessage = params?.error;
  const infoMessage = params?.info;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex space-x-2 border-b">
          <button
            onClick={() => setIsLoginView(true)}
            className={`pb-2 px-4 ${isLoginView ? 'border-b-2 border-blue-500 text-blue-600 font-semibold' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginView(false)}
            className={`pb-2 px-4 ${!isLoginView ? 'border-b-2 border-blue-500 text-blue-600 font-semibold' : 'text-gray-500'}`}
          >
            Register
          </button>
        </div>

        {errorMessage && (
          <div className="text-red-700 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            {decodeURIComponent(errorMessage)}
          </div>
        )}
        {infoMessage && (
          <div className="text-blue-700 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            {decodeURIComponent(infoMessage)}
          </div>
        )}

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                📧
              </span>
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
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                🔒
              </span>
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

          <button
            formAction={isLoginView ? login : signup}
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {isLoginView ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          {isLoginView ? (
            "Don't have an account? Click Register above."
          ) : (
            "Already have an account? Click Login above."
          )}
        </p>
        
        <div className="text-center text-sm">
          <Link 
            href="https://forms.gle/8ENaz7dhUGqUSN688" 
            target="_blank"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Send feedback
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;