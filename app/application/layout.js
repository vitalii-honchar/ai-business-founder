import Link from 'next/link';
import { HiLogout } from 'react-icons/hi';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
            <header className="bg-white shadow">
                <div className="w-full p-4 flex justify-between items-center">
                    <Link href="/" className="text-xl sm:text-2xl font-bold">
                        AI Founder
                    </Link>
                    <Link href="/logout" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                        <HiLogout className="w-5 h-5" />
                    </Link>
                </div>
            </header>
            <main className="flex-grow w-full px-2 sm:px-4 py-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                    {children}
                </div>
            </main>
            <footer className="bg-white shadow mt-4">
                <div className="w-full px-2 sm:px-4 py-4 text-center">
                    <p className="text-xs sm:text-sm">&copy; 2025 AI Founder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}