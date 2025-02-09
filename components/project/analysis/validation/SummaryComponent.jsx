'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import projecApi from '@/lib/client/api/project_api';

function ScoreCard({ label, score }) {
    const getScoreConfig = (score) => {
        if (score >= 8) return {
            bg: 'bg-green-50',
            text: 'text-green-700',
            bar: 'bg-green-500',
            ring: 'ring-green-500/30',
            label: 'Excellent'
        };
        if (score >= 6) return {
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            bar: 'bg-blue-500',
            ring: 'ring-blue-500/30',
            label: 'Good'
        };
        if (score >= 4) return {
            bg: 'bg-yellow-50',
            text: 'text-yellow-700',
            bar: 'bg-yellow-500',
            ring: 'ring-yellow-500/30',
            label: 'Fair'
        };
        return {
            bg: 'bg-red-50',
            text: 'text-red-700',
            bar: 'bg-red-500',
            ring: 'ring-red-500/30',
            label: 'Poor'
        };
    };

    const config = getScoreConfig(score);

    return (
        <div className={`${config.bg} rounded-lg p-4 ring-1 ring-inset ${config.ring}`}>
            <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.text}`}>
                    {config.label}
                </span>
            </div>
            
            <div className="flex items-end gap-2">
                <div className={`text-2xl font-bold ${config.text}`}>
                    {score}
                </div>
                <div className="text-sm text-gray-500 mb-1">/10</div>
            </div>

            <div className="mt-2 relative">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className={`h-full ${config.bar} transition-all duration-500 ease-out rounded-full`}
                        style={{ width: `${score * 10}%` }}
                    />
                </div>
                {/* Score markers */}
                <div className="absolute top-3 left-0 right-0 flex justify-between px-0.5">
                    <div className="text-[10px] text-gray-400">0</div>
                    <div className="text-[10px] text-gray-400">5</div>
                    <div className="text-[10px] text-gray-400">10</div>
                </div>
            </div>
        </div>
    );
}

function RiskSection({ risks }) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Risk Assessment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(risks).map(([key, items]) => (
                    <div key={key} className="bg-red-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2 capitalize">
                            {key.replace(/_/g, ' ')}
                        </h4>
                        <ul className="space-y-1">
                            {items.map((risk, index) => (
                                <li key={index} className="text-sm text-gray-700">
                                    • {risk}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FeasibilitySection({ feasibility }) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Feasibility Analysis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Critical Failure Points</h4>
                    <ul className="space-y-1">
                        {feasibility.critical_failure_points.map((point, index) => (
                            <li key={index} className="text-sm text-gray-700">• {point}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Resource Gaps</h4>
                    <ul className="space-y-1">
                        {feasibility.resource_gaps.map((gap, index) => (
                            <li key={index} className="text-sm text-gray-700">• {gap}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Timeline Feasibility</h4>
                    <p className="text-sm text-gray-700">{feasibility.timeline_feasibility}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Investment Requirements</h4>
                    <ul className="space-y-1">
                        {feasibility.investment_requirements.map((req, index) => (
                            <li key={index} className="text-sm text-gray-700">• {req}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function AlternativesSection({ alternatives }) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Alternative Recommendations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Pivot Suggestions</h4>
                    <ul className="space-y-1">
                        {alternatives.pivot_suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-gray-700">• {suggestion}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Resource Optimization</h4>
                    <ul className="space-y-1">
                        {alternatives.resource_optimization.map((opt, index) => (
                            <li key={index} className="text-sm text-gray-700">• {opt}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-cyan-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Timeline Adjustments</h4>
                    <ul className="space-y-1">
                        {alternatives.timeline_adjustments.map((adj, index) => (
                            <li key={index} className="text-sm text-gray-700">• {adj}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-teal-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Risk Mitigation</h4>
                    <ul className="space-y-1">
                        {alternatives.risk_mitigation.map((mitigation, index) => (
                            <li key={index} className="text-sm text-gray-700">• {mitigation}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function SummaryComponent({ summary, readOnly }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleProblemClick = async (userInput) => {
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

    const { recommendation, similar_problems } = summary;

    const getScoreColor = (score) => {
        if (score >= 8) return 'bg-green-600';
        if (score >= 5) return 'bg-blue-600';
        return 'bg-red-600';
    };

    const getScoreTextColor = (score) => {
        if (score >= 8) return 'text-green-600';
        if (score >= 5) return 'text-blue-600';
        return 'text-red-600';
    };

    console.log('Summary:');
    console.dir(summary);

    return (
        <div className="space-y-6">
            {/* Main Recommendation */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Validation Summary</h2>
                    <span className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm ${
                        recommendation.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {recommendation.valid ? 'Valid' : 'Invalid'}
                    </span>
                </div>

                <p className="text-gray-600 mb-6">{recommendation.explanation}</p>

                {/* Scores Grid - Updated layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <ScoreCard 
                        label="Problem Validity" 
                        score={recommendation.scores.problem_validity} 
                    />
                    <ScoreCard 
                        label="Market Opportunity" 
                        score={recommendation.scores.market_opportunity} 
                    />
                    <ScoreCard 
                        label="Execution Feasibility" 
                        score={recommendation.scores.execution_feasibility} 
                    />
                    <ScoreCard 
                        label="Resource Adequacy" 
                        score={recommendation.scores.resource_adequacy} 
                    />
                    <ScoreCard 
                        label="Competitive Advantage" 
                        score={recommendation.scores.competitive_advantage} 
                    />
                    <ScoreCard 
                        label="Overall Viability" 
                        score={recommendation.scores.overall_viability} 
                    />
                </div>

                {/* SWOT Analysis */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-2 md:p-4 rounded-lg">
                        <h3 className="font-medium mb-1 md:mb-2 text-green-800">Strengths</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {recommendation.swot_analysis.strengths.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-red-50 p-2 md:p-4 rounded-lg">
                        <h3 className="font-medium mb-1 md:mb-2 text-red-800">Weaknesses</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {recommendation.swot_analysis.weaknesses.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-yellow-50 p-2 md:p-4 rounded-lg">
                        <h3 className="font-medium mb-1 md:mb-2 text-yellow-800">Opportunities</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {recommendation.swot_analysis.opportunities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-50 p-2 md:p-4 rounded-lg">
                        <h3 className="font-medium mb-1 md:mb-2 text-gray-800">Threats</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {recommendation.swot_analysis.threats.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Risk Assessment */}
            <RiskSection risks={recommendation.risks} />

            {/* Feasibility Analysis */}
            <FeasibilitySection feasibility={recommendation.feasibility} />

            {/* Alternative Recommendations */}
            <AlternativesSection alternatives={recommendation.alternatives} />

            {/* Similar Problems */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6 mt-8">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Similar Problems</h2>
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}
                <div className="space-y-3 md:space-y-4"> {/* Increased spacing on mobile */}
                    {similar_problems.map((problem, index) => (
                        <div key={index} className="group relative">
                            {/* Button */}
                            <button
                                onClick={() => !readOnly && handleProblemClick(problem.user_input)}
                                disabled={loading || readOnly}
                                className={`w-full text-left border border-transparent transition-all duration-200 
                                    ${readOnly ? 'cursor-default' : 'hover:border-blue-100 hover:bg-blue-50/50 group-hover:shadow-md group-hover:scale-[1.01]'} 
                                    rounded-lg p-3 md:p-3
                                    disabled:opacity-100 disabled:hover:bg-transparent disabled:hover:border-transparent
                                    ${!readOnly && 'active:scale-[0.99]'} transform
                                    relative flex flex-col
                                    before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-200
                                    ${!readOnly && 'hover:before:border-blue-400'} before:transition-colors
                                    touch-manipulation`}
                            >
                                {/* Mobile-friendly click indicator */}
                                <div className="flex items-center justify-between mb-2 md:mb-0">
                                    <h3 className={`font-medium ${!readOnly ? 'group-hover:text-blue-700' : ''} transition-colors duration-200 pr-2`}>
                                        {problem.name}
                                    </h3>
                                    {/* Score and action indicator combined for mobile */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            <span className="text-xs md:text-sm text-gray-600 mr-1 md:mr-2 group-hover:text-gray-700">
                                                Score:
                                            </span>
                                            <span className={`text-xs md:text-sm font-medium ${getScoreTextColor(problem.worth_solving)} group-hover:opacity-90`}>
                                                {problem.worth_solving}/10
                                            </span>
                                        </div>
                                        {!readOnly && (
                                            <div className="flex items-center text-blue-500 md:hidden">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content with better mobile spacing */}
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600 group-hover:text-gray-700 line-clamp-3 md:line-clamp-none">
                                        {problem.explanation}
                                    </p>

                                    {/* Mobile action hint */}
                                    {!readOnly && (
                                        <div className="flex items-center justify-center md:hidden py-2 mt-2 border-t border-gray-100">
                                            <span className="text-xs text-blue-500 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Tap to use this idea
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Desktop-only "Click to use" indicator */}
                                {!readOnly && (
                                    <div className="absolute top-3 right-3 hidden md:flex text-xs text-gray-400 items-center gap-1 group-hover:text-blue-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Click to use</span>
                                    </div>
                                )}
                            </button>

                            {/* Desktop-only tooltip */}
                            {!readOnly && (
                                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 
                                    top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 
                                    text-sm text-white bg-gray-900 rounded-lg transition-all duration-200 
                                    whitespace-nowrap z-10 hidden md:block">
                                    Click to create a new project based on this recommendation
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2">
                                        <div className="border-solid border-b-gray-900 border-b-8 border-x-transparent border-x-8 border-t-0"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}