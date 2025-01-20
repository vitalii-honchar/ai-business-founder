import Link from 'next/link';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
            <header className="bg-white shadow">
                <div className="w-full p-4">
                    <Link href="/" legacyBehavior>
                        <a className="text-2xl font-bold">AI Business Founder</a>
                    </Link>
                </div>
            </header>
            <main className="flex-grow w-full px-4 py-4">
                <div className="bg-white shadow rounded-lg p-6">
                    {children}
                </div>
            </main>
            <footer className="bg-white shadow mt-4">
                <div className="w-full px-4 py-4 text-center">
                    <p className="text-sm">&copy; 2025 AI Business Founder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
