import { useState } from 'react';
import { useRouter } from 'next/navigation';
import projecApi from '@/lib/client/api/project_api';

function getEmojiForKey(key) {
    const emojis = {
        problem: '💡',
        industry: '🏢',
        location: '📍',
        platform: '💻',
        auditory: '👥',
        targetRevenue: '💰',
    };
    return emojis[key] || '✨';
}

function OptimizationCard({ optimization, readOnly, onSelect, loading }) {
    const {
        name,
        explanation,
        potential_score,
        user_input
    } = optimization;

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <span>✨</span>
                        {name}
                    </h3>
                    <div className="flex items-center mb-3">
                        <span className="text-sm font-medium text-gray-600 mr-2">
                            <span className="mr-1">🎯</span>
                            Potential:
                        </span>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                potential_score >= 8 ? 'bg-green-100 text-green-800' :
                                potential_score >= 6 ? 'bg-blue-100 text-blue-800' :
                                potential_score >= 4 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {potential_score}/10
                            </span>
                            <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${
                                        potential_score >= 8 ? 'bg-green-500' :
                                        potential_score >= 6 ? 'bg-blue-500' :
                                        potential_score >= 4 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                    }`}
                                    style={{ width: `${potential_score * 10}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">{explanation}</p>
                </div>
                {!readOnly && (
                    <button
                        onClick={() => onSelect(user_input)}
                        disabled={loading}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                            disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 
                            flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin">⚡</span>
                                Creating...
                            </>
                        ) : (
                            <>
                                <span>Try This Variation</span>
                                <span>🚀</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Expandable Details Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md 
                    transition-colors duration-200 flex items-center justify-between"
            >
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span>{isExpanded ? '📖' : '📘'}</span>
                    {isExpanded ? 'Hide Details' : 'Show Details'}
                </span>
                <svg 
                    className={`w-4 h-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="mt-4 space-y-4">
                    {/* Modified Input Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {Object.entries(user_input).map(([key, value]) => {
                            if (['language', 'currency', 'personalConstraints'].includes(key)) {
                                return null;
                            }
                            return (
                                <div key={key} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                    <h4 className="font-medium text-gray-800 mb-2 capitalize flex items-center gap-2">
                                        <span>{getEmojiForKey(key)}</span>
                                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                    </h4>
                                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{value}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Constraints Section */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                            <span>🔒</span>
                            Original Constraints
                        </h4>
                        <div className="space-y-2">
                            {[
                                { label: 'Language', value: user_input.language, emoji: '🗣️' },
                                { label: 'Currency', value: user_input.currency, emoji: '💱' },
                                { label: 'Personal Constraints', value: user_input.personalConstraints, emoji: '🎯' }
                            ].map(({ label, value, emoji }) => (
                                <div key={label} className="text-sm bg-white bg-opacity-50 p-2 rounded">
                                    <span className="font-medium text-gray-700">
                                        <span className="mr-1">{emoji}</span>
                                        {label}:
                                    </span>
                                    <span className="text-gray-600">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper function to get icons for different keys
function getIconForKey(key) {
    const iconClass = "w-5 h-5";
    const icons = {
        problem: <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>,
        industry: <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>,
        // Add more icons for other keys...
    };
    
    return icons[key] || null;
}

export default function OptimizationsComponent({ optimizations = [], readOnly }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOptimizationSelect = async (userInput) => {
        try {
            setLoading(true);
            setError(null);
            const newProject = await projecApi.createProject(userInput);
            router.push(`/application/project/${newProject.id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Show loading state if no optimizations are provided yet
    if (!optimizations) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <span className="animate-spin text-2xl inline-block mb-2">⚡</span>
                    <p className="text-gray-600">Loading optimizations...</p>
                </div>
            </div>
        );
    }

    // Show message if optimizations array is empty
    if (optimizations.length === 0) {
        return (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
                <span className="text-2xl mb-2 inline-block">🤔</span>
                <p className="text-gray-600">No optimizations available yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {optimizations.map((optimization, index) => (
                <OptimizationCard
                    key={index}
                    optimization={optimization}
                    readOnly={readOnly}
                    onSelect={handleOptimizationSelect}
                    loading={loading}
                />
            ))}
            
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}
        </div>
    );
} 