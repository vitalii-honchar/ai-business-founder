'use client';
import { use } from "react";
import LoginComponent from '@/components/login/LoginComponent';
import RegisterComponent from '@/components/login/RegisterComponent';
import ResetPasswordComponent from '@/components/login/ResetPasswordComponent';
import ForgotPasswordComponent from '@/components/login/ForgotPasswordComponent';
import ErrorMessageComponent from '@/components/common/ErrorMessageComponent';
import InfoMessageComponent from '@/components/common/InfoMessageComponent';
import CenterCardComponent from '@/components/common/CenterCardComponent';
import SendFeedbackComponent from '@/components/common/SendFeedbackComponent';
import TabComponent from '@/components/common/TabComponent';
import { useState } from 'react';

const LoginPage = ({ searchParams }) => {
  const params = use(searchParams);
  const [activeTab, setActiveTab] = useState(params?.activeTab || 'login');

  console.log('activeTab:', activeTab);

  const errorMessage = params?.error_description;
  const infoMessage = params?.info;
  const operation = params?.operation;
  const code = params?.code;

  const tabs = [
    { id: 'login', label: 'Login' },
    { id: 'register', label: 'Register' },
  ];

  // Handle reset password view
  if (operation === 'reset') {
    return (
      <CenterCardComponent>
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <ErrorMessageComponent message={errorMessage} />
        <ResetPasswordComponent code={code} />
        <SendFeedbackComponent />
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
        <LoginComponent tabKey="login" />
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