'use client';
import { use } from "react";
import Link from 'next/link';
import LoginComponent from '@/components/login/LoginComponent';
import RegisterComponent from '@/components/login/RegisterComponent';
import ResetPasswordComponent from '@/components/login/ResetPasswordComponent';
import ForgotPasswordComponent from '@/components/login/ForgotPasswordComponent';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import InfoMessageComponent from '@/components/common/InfoMessageComponent';
import CenterCardComponent from '@/components/common/CenterCardComponent';
import { useState } from 'react';

const LoginPage = ({ searchParams }) => {
  const params = use(searchParams);
  const [isLoginView, setIsLoginView] = useState(true);
  
  const errorMessage = params?.error_description;
  const infoMessage = params?.info;
  const operation = params?.operation;
  const code = params?.code;

  // Handle reset password view
  if (operation === 'reset') {
    return (
      <CenterCardComponent>
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <ErrorMessageComponent message={errorMessage} />
        <ResetPasswordComponent code={code} />
      </CenterCardComponent>
    );
  }

  // Handle forgot password view
  if (operation === 'forgot') {
    return (
      <CenterCardComponent>
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
        <ErrorMessageComponent message={errorMessage} />
        <InfoMessageComponent message={infoMessage} />
        <ForgotPasswordComponent />
      </CenterCardComponent>
    );
  }

  // Main login/register view
  return (
    <CenterCardComponent>
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

      <ErrorMessageComponent message={errorMessage} />
      <InfoMessageComponent message={infoMessage} />

      {isLoginView ? <LoginComponent /> : <RegisterComponent />}

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
    </CenterCardComponent>
  );
};

export default LoginPage;