import { useState } from 'react';
import { useRouter } from 'next/navigation';
import projecApi from '@/lib/client/api/project_api';

function OptimizationCard({ optimization, readOnly, onSelect, loading }) {
    const {
        name,
        explanation,
        potential_score,
        detailed_analysis,
        success_factors
    } = optimization;

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <div className="mt-1 flex items-center">
                        <span className="text-sm font-medium text-gray-600 mr-2">Potential Score:</span>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            potential_score >= 8 ? 'bg-green-100 text-green-800' :
                            potential_score >= 6 ? 'bg-blue-100 text-blue-800' :
                            potential_score >= 4 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {potential_score}/10
                        </span>
                    </div>
                </div>
                {!readOnly && (
                    <button
                        onClick={() => onSelect(optimization.user_input)}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Try This'}
                    </button>
                )}
            </div>

            <p className="text-gray-600 mb-4">{explanation}</p>

            {/* Expandable Details */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
                {isExpanded ? 'Show Less' : 'Show More'}
                <span className="text-xl">{isExpanded ? '↑' : '↓'}</span>
            </button>

            {isExpanded && (
                <div className="mt-4 space-y-6">
                    {/* Detailed Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(detailed_analysis).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2 capitalize">
                                    {key.replace(/_/g, ' ')}
                                </h4>
                                <div className="space-y-2">
                                    {Object.entries(value).map(([subKey, subValue]) => (
                                        <div key={subKey} className="text-sm">
                                            <span className="font-medium text-gray-700">{subKey}: </span>
                                            <span className="text-gray-600">{subValue}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Success Factors */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">Success Factors</h4>
                        <div className="space-y-4">
                            <p className="text-gray-700">{success_factors.explanation}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="font-medium text-gray-700 mb-2">Market Validation</h5>
                                    <ul className="list-disc list-inside text-sm text-gray-600">
                                        {success_factors.market_validation.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div>
                                    <h5 className="font-medium text-gray-700 mb-2">Competitive Advantages</h5>
                                    <ul className="list-disc list-inside text-sm text-gray-600">
                                        {success_factors.competitive_advantages.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h5 className="font-medium text-gray-700 mb-2">Implementation Roadmap</h5>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    {success_factors.implementation_roadmap.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function OptimizationsComponent({ optimizations, readOnly }) {
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
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}
        </div>
    );
} 