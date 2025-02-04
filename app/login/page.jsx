'use client';
import { use } from "react";
import LoginComponent from '@/components/login/LoginComponent';
import RegisterComponent from '@/components/login/RegisterComponent';
import ResetPasswordComponent from '@/components/login/ResetPasswordComponent';
import ForgotPasswordComponent from '@/components/login/ForgotPasswordComponent';
import CenterCardComponent from '@/components/common/CenterCardComponent';
import SendFeedbackComponent from '@/components/common/SendFeedbackComponent';
import TabComponent from '@/components/common/TabComponent';
import { useState } from 'react';

const getOperation = (params) => {
  const error = params?.error;
  return error == 'access_denied' ? 'login' : params?.operation;
}

const LoginPage = ({ searchParams }) => {
  const params = use(searchParams);

  const [activeTab, setActiveTab] = useState(params?.activeTab || 'login');
  const [showResetForm, setShowResetForm] = useState(true);
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');
  const errorMessage = params?.error_description;
  const operation = getOperation(params);
  const code = params?.code;

  const tabs = [
    { id: 'login', label: 'Login' },
    { id: 'register', label: 'Register' },
  ];

  if (operation === 'reset' && showResetForm) {
    return (
      <CenterCardComponent>
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <ResetPasswordComponent 
          code={code} 
          errorMessage={errorMessage}
          onResetSuccess={(message) => {
            setShowResetForm(false);
            setResetSuccessMessage(message);
          }}
        />
        <SendFeedbackComponent />
      </CenterCardComponent>
    );
  }

  // Handle forgot password view
  if (operation === 'forgot') {
    return (
      <CenterCardComponent>
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
        <ForgotPasswordComponent />
        <SendFeedbackComponent />
      </CenterCardComponent>
    );
  }

  // Main login/register view
  return (
    <CenterCardComponent>
      <TabComponent
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={setActiveTab}
      >
        <LoginComponent tabKey="login" initialMessage={resetSuccessMessage} errorMessage={errorMessage} />
        <RegisterComponent tabKey="register" />
      </TabComponent>

      <p className="text-center text-sm text-gray-600">
        {activeTab === 'login' ? (
          "Don't have an account? Click Register above."
        ) : (
          "Already have an account? Click Login above."
        )}
      </p>

      <SendFeedbackComponent />
    </CenterCardComponent>
  );
};

export default LoginPage;