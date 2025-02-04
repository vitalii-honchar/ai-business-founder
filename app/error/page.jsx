'use client'

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || 'Sorry, something went wrong';

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