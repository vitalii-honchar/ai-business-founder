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

const Operation = Object.freeze({
  LOGIN: 'login',
  REGISTER: 'register',
  RESET: 'reset',
  FORGOT: 'forgot',
  CONFIRM_EMAIL: 'confirm_email',
});

const getOperation = (params) => {
  const error = params?.error;
  return error == 'access_denied' ? Operation.LOGIN : params?.operation;
};

const getLoginMessage = (params) => {
  const operation = getOperation(params);
  if (operation === Operation.CONFIRM_EMAIL) {
    return 'Account confirmed. Please login.';
  }
  return '';
};

const LoginPage = ({ searchParams }) => {
  const params = use(searchParams);

  const [activeTab, setActiveTab] = useState(params?.activeTab || Operation.LOGIN);
  const [showResetForm, setShowResetForm] = useState(true);
  const [loginMessage, setLoginMessage] = useState(getLoginMessage(params));
  const errorMessage = params?.error_description;
  const operation = getOperation(params);
  const code = params?.code;
  const plan = params?.plan;

  const tabs = [
    { id: Operation.LOGIN, label: 'Login' },
    { id: Operation.REGISTER, label: 'Register' },
  ];

  if (operation === Operation.RESET && showResetForm) {
    return (
      <CenterCardComponent>
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <ResetPasswordComponent
          code={code}
          errorMessage={errorMessage}
          onResetSuccess={(message) => {
            setShowResetForm(false);
            setLoginMessage(message);
          }}
        />
        <SendFeedbackComponent />
      </CenterCardComponent>
    );
  }

  // Handle forgot password view
  if (operation === Operation.FORGOT) {
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
    <CenterCardComponent size={activeTab === Operation.REGISTER ? 'xl' : 'default'}>
      <TabComponent
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={setActiveTab}
      >
        <LoginComponent 
          tabKey={Operation.LOGIN} 
          initialMessage={loginMessage} 
          errorMessage={errorMessage}
          isConfirmedEmail={operation === Operation.CONFIRM_EMAIL}
          subscriptionPlan={plan}
        />
        <RegisterComponent tabKey={Operation.REGISTER} />
      </TabComponent>

      <p className="text-center text-sm text-gray-600">
        {activeTab === Operation.LOGIN ? (
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