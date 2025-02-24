'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function UserMenu({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isLoggedIn) {
        return (
            <Link 
                href="/login" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base transition-colors"
            >
                <span className="text-xl">👤</span>
                <span>Sign In / Sign Up</span>
            </Link>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="User menu"
            >
                <span className="text-2xl">👤</span>
                <svg 
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                    <Link 
                        href="/application/user-profile/subscription"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="text-xl">💳</span>
                        <span>Subscription</span>
                    </Link>
                    
                    <div className="h-px bg-gray-200 my-1"></div>
                    
                    <Link 
                        href="/logout"
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="text-xl">🚪</span>
                        <span>Sign Out</span>
                    </Link>
                </div>
            )}
        </div>
    );
} 