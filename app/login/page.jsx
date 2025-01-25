'use client';
import { login, signup } from "./actions";
import { useState, use } from "react";

const LoginPage = ({ searchParams }) => {
  const params = use(searchParams);
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const errorMessage = params?.error;
  const infoMessage = params?.info;

  const handleSubmit = async (action) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

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
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors
              ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLoginView ? 'Logging in...' : 'Registering...'}
              </span>
            ) : (
              <span>{isLoginView ? 'Login' : 'Register'}</span>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          {isLoginView ? (
            "Don't have an account? Click Register above."
          ) : (
            "Already have an account? Click Login above."
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;