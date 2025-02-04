'use client'

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function ErrorContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || 'An error occurred';

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl font-semibold mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-800 underline"
            >
                Go Home
            </Link>
        </div>
    );
}

export default function ErrorPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error</h1>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <ErrorContent />
        </Suspense>
    );
}