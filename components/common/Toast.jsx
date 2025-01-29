'use client'

import { useEffect, useState } from 'react';

const toastEventTarget = new EventTarget();
const TOAST_EVENT = 'TOAST_EVENT';

export const Toast = {
    success: ({ title, message, action, duration = 5000 }) => {
        const event = new CustomEvent(TOAST_EVENT, {
            detail: { type: 'success', title, message, action, duration }
        });
        toastEventTarget.dispatchEvent(event);
    },
    error: ({ title, message, duration = 5000 }) => {
        const event = new CustomEvent(TOAST_EVENT, {
            detail: { type: 'error', title, message, duration }
        });
        toastEventTarget.dispatchEvent(event);
    }
};

export function ToastContainer() {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const handleToast = (event) => {
            setToast(event.detail);
            if (event.detail.duration) {
                setTimeout(() => {
                    setToast(null);
                }, event.detail.duration);
            }
        };

        toastEventTarget.addEventListener(TOAST_EVENT, handleToast);
        return () => toastEventTarget.removeEventListener(TOAST_EVENT, handleToast);
    }, []);

    if (!toast) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {toast.type === 'success' ? (
                            <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">{toast.title}</p>
                        <p className="mt-1 text-sm text-gray-500">{toast.message}</p>
                        {toast.action && (
                            <div className="mt-3">
                                <button
                                    onClick={() => {
                                        toast.action.onClick();
                                        setToast(null);
                                    }}
                                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {toast.action.label}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            onClick={() => setToast(null)}
                            className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
