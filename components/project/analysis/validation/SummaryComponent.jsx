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

function GoNoGoSection({ decision }) {
    const getDecisionColor = (decision) => {
        return decision === "GO" ? "green" : "red";
    };
    
    const color = getDecisionColor(decision.decision);
    
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Go/No-Go Decision</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Decision and Confidence */}
                <div className={`bg-${color}-50 p-4 rounded-lg col-span-full`}>
                    <div className="flex justify-between items-center mb-3">
                        <span className={`text-xl font-bold text-${color}-700`}>
                            {decision.decision}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Confidence:</span>
                            <span className={`text-${color}-700 font-semibold`}>
                                {decision.confidence_score}/10
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-700 mb-3">{decision.revenue_achievability}</p>
                </div>

                {/* Key Factors */}
                <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Key Factors</h4>
                    <ul className="space-y-1">
                        {decision.key_factors.map((factor, index) => (
                            <li key={index} className="text-sm text-gray-700">• {factor}</li>
                        ))}
                    </ul>
                </div>

                {/* Prerequisites */}
                <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Critical Prerequisites</h4>
                    <ul className="space-y-1">
                        {decision.critical_prerequisites.map((prereq, index) => (
                            <li key={index} className="text-sm text-gray-700">• {prereq}</li>
                        ))}
                    </ul>
                </div>

                {/* Next Steps */}
                <div className="bg-teal-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Recommended Next Steps</h4>
                    <ul className="space-y-1">
                        {decision.recommended_next_steps.map((step, index) => (
                            <li key={index} className="text-sm text-gray-700">• {step}</li>
                        ))}
                    </ul>
                </div>

                {/* Risk and Resource Assessment */}
                <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Risk & Resource Assessment</h4>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Risk Assessment:</span> {decision.risk_threshold_assessment}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Resource Status:</span> {decision.resource_readiness_status}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OptimizedProblemsSection({ problems, readOnly, onProblemClick }) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Optimized Variations</h2>
            <div className="space-y-4">
                {problems.map((problem, index) => (
                    <div key={index} 
                         className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all duration-200">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-medium text-gray-800">{problem.name}</h3>
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                Score: {problem.potential_score}/10
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{problem.explanation}</p>
                        
                        {!readOnly && (
                            <button
                                onClick={() => onProblemClick(problem.user_input)}
                                className="w-full mt-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Try This Variation
                            </button>
                        )}
                    </div>
                ))}
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

    const { recommendation, optimized_problems } = summary;

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

            {/* Go/No-Go Decision Section */}
            <GoNoGoSection decision={recommendation.go_no_go_decision} />

            {/* Risk Assessment */}
            <RiskSection risks={recommendation.risks} />

            {/* Feasibility Analysis */}
            <FeasibilitySection feasibility={recommendation.feasibility} />

            {/* Alternative Recommendations */}
            <AlternativesSection alternatives={recommendation.alternatives} />

            {/* Optimized Problems (replacing Similar Problems) */}
            <OptimizedProblemsSection 
                problems={optimized_problems}
                readOnly={readOnly}
                onProblemClick={handleProblemClick}
            />
        </div>
    );
}