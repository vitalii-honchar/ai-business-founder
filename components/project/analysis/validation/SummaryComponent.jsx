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
        <div className={`${config.bg} rounded-lg p-2 sm:p-4 ring-1 ring-inset ${config.ring}`}>
            <div className="flex justify-between items-start mb-1 sm:mb-2">
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

function AchievableRevenueCard({ achievableRevenue }) {
    const { amount, currency, timeline, confidence_score, key_assumptions } = achievableRevenue;
    
    const getConfidenceColor = (score) => {
        if (score >= 8) return 'text-green-700 bg-green-50 ring-green-500/30';
        if (score >= 6) return 'text-blue-700 bg-blue-50 ring-blue-500/30';
        if (score >= 4) return 'text-yellow-700 bg-yellow-50 ring-yellow-500/30';
        return 'text-red-700 bg-red-50 ring-red-500/30';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revenue Amount and Timeline */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">Estimated Revenue</div>
                    <div className="text-2xl font-bold text-blue-700">
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: currency || 'USD',
                            maximumFractionDigits: 0,
                        }).format(amount)}
                    </div>
                </div>
                <div>
                    <div className="text-sm text-gray-600 mb-1">Timeline</div>
                    <div className="text-lg font-medium text-gray-800">{timeline}</div>
                </div>
            </div>

            {/* Confidence Score */}
            <div className={`rounded-lg p-4 ring-1 ring-inset ${getConfidenceColor(confidence_score)}`}>
                <div className="text-sm text-gray-600 mb-1">Confidence Score</div>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">{confidence_score}</span>
                    <span className="text-sm text-gray-500 mb-1">/10</span>
                </div>
            </div>

            {/* Key Assumptions - Full width */}
            <div className="col-span-full mt-2">
                <h4 className="font-medium text-gray-700 mb-2">Key Assumptions</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {key_assumptions.map((assumption, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{assumption}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function RiskSection({ risks }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {Object.entries(risks).map(([key, items]) => (
                <div key={key} className="bg-red-50 p-2 sm:p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-1 sm:mb-2 capitalize">
                        {key.replace(/_/g, ' ')}
                    </h4>
                    <ul className="space-y-0.5 sm:space-y-1">
                        {items.map((risk, index) => (
                            <li key={index} className="text-sm text-gray-700">
                                • {risk}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function FeasibilitySection({ feasibility }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-yellow-50 p-2 sm:p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Critical Failure Points</h4>
                <ul className="space-y-0.5 sm:space-y-1">
                    {feasibility.critical_failure_points.map((point, index) => (
                        <li key={index} className="text-sm text-gray-700">• {point}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Resource Gaps</h4>
                <ul className="space-y-0.5 sm:space-y-1">
                    {feasibility.resource_gaps.map((gap, index) => (
                        <li key={index} className="text-sm text-gray-700">• {gap}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Timeline Feasibility</h4>
                <p className="text-sm text-gray-700">{feasibility.timeline_feasibility}</p>
            </div>
            <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Investment Requirements</h4>
                <ul className="space-y-0.5 sm:space-y-1">
                    {feasibility.investment_requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-700">• {req}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function AlternativesSection({ alternatives }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Pivot Suggestions</h4>
                <ul className="space-y-0.5 sm:space-y-1">
                    {alternatives.pivot_suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-gray-700">• {suggestion}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-indigo-50 p-2 sm:p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Resource Optimization</h4>
                <ul className="space-y-0.5 sm:space-y-1">
                    {alternatives.resource_optimization.map((opt, index) => (
                        <li key={index} className="text-sm text-gray-700">• {opt}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-cyan-50 p-2 sm:p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Timeline Adjustments</h4>
                <ul className="space-y-0.5 sm:space-y-1">
                    {alternatives.timeline_adjustments.map((adj, index) => (
                        <li key={index} className="text-sm text-gray-700">• {adj}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-teal-50 p-2 sm:p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Risk Mitigation</h4>
                <ul className="space-y-0.5 sm:space-y-1">
                    {alternatives.risk_mitigation.map((mitigation, index) => (
                        <li key={index} className="text-sm text-gray-700">• {mitigation}</li>
                    ))}
                </ul>
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
        <div>
            {/* Main decision banner */}
            <div className={`bg-${color}-50 p-2 sm:p-4 rounded-lg mb-2 sm:mb-4`}>
                <div className="flex justify-between items-center">
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
                <p className="text-gray-700 mt-2">{decision.revenue_achievability}</p>
            </div>

            {/* Grid layout for other information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Key Factors</h4>
                    <ul className="space-y-0.5 sm:space-y-1">
                        {decision.key_factors.map((factor, index) => (
                            <li key={index} className="text-sm text-gray-700">• {factor}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Critical Prerequisites</h4>
                    <ul className="space-y-0.5 sm:space-y-1">
                        {decision.critical_prerequisites.map((prereq, index) => (
                            <li key={index} className="text-sm text-gray-700">• {prereq}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-teal-50 p-2 sm:p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Recommended Next Steps</h4>
                    <ul className="space-y-0.5 sm:space-y-1">
                        {decision.recommended_next_steps.map((step, index) => (
                            <li key={index} className="text-sm text-gray-700">• {step}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-amber-50 p-2 sm:p-3 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-1 sm:mb-2">Risk & Resource Assessment</h4>
                    <div className="space-y-1 sm:space-y-2">
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

export default function SummaryComponent({ summary, readOnly }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { recommendation } = summary;

    return (
        <div className="space-y-3 sm:space-y-6 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
            {/* Quick Overview Card */}
            <div className="bg-white rounded-lg shadow-lg p-2 sm:p-4 border-l-4 border-blue-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1.5 sm:mb-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                            Project Validation Summary
                            {recommendation.valid ? 
                                <span className="text-xl sm:text-2xl">✨</span> : 
                                <span className="text-xl sm:text-2xl">🎯</span>
                            }
                        </h2>
                    </div>
                    <span className={`mt-2 sm:mt-0 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                        recommendation.valid ? 
                        'bg-green-100 text-green-800 border border-green-200' : 
                        'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                        {recommendation.valid ? '✅ Valid' : '⚠️ Needs Improvement'}
                    </span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{recommendation.explanation}</p>
            </div>

            {/* Section wrapper with minimal mobile spacing */}
            <div className="space-y-2 sm:space-y-6">
                {/* Common section styling */}
                <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6 border-t-4 border-indigo-500">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                        <span>Final Verdict</span>
                        {recommendation.go_no_go_decision.decision === "GO" ? 
                            <span className="text-xl sm:text-2xl">🚀</span> : 
                            <span className="text-xl sm:text-2xl">⏸️</span>
                        }
                    </h3>
                    <GoNoGoSection decision={recommendation.go_no_go_decision} />
                </div>

                {/* Revenue Potential */}
                <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6 border-t-4 border-green-500">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                        <span>Revenue Potential</span>
                        <span className="text-2xl">💰</span>
                    </h3>
                    <AchievableRevenueCard achievableRevenue={recommendation.achievable_revenue} />
                </div>

                {/* Key Metrics Grid */}
                <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                        <span>Key Performance Indicators</span>
                        <span className="text-2xl">📊</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ScoreCard 
                            label="Market Opportunity" 
                            score={recommendation.scores.market_opportunity} 
                        />
                        <ScoreCard 
                            label="Problem Validity" 
                            score={recommendation.scores.problem_validity} 
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
                </div>

                {/* SWOT Analysis with improved visuals */}
                <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                        <span>Strategic Analysis</span>
                        <span className="text-2xl">🎯</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <h4 className="font-medium mb-3 text-green-800 flex items-center gap-2">
                                <span className="text-xl">💪</span> Strengths
                            </h4>
                            <ul className="space-y-2">
                                {recommendation.swot_analysis.strengths.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-green-700">
                                        <span className="text-green-500 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                            <h4 className="font-medium mb-3 text-red-800 flex items-center gap-2">
                                <span className="text-xl">⚠️</span> Weaknesses
                            </h4>
                            <ul className="space-y-2">
                                {recommendation.swot_analysis.weaknesses.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-red-700">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                            <h4 className="font-medium mb-3 text-yellow-800 flex items-center gap-2">
                                <span className="text-xl">🎯</span> Opportunities
                            </h4>
                            <ul className="space-y-2">
                                {recommendation.swot_analysis.opportunities.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-yellow-700">
                                        <span className="text-yellow-500 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="font-medium mb-3 text-gray-800 flex items-center gap-2">
                                <span className="text-xl">🛡️</span> Threats
                            </h4>
                            <ul className="space-y-2">
                                {recommendation.swot_analysis.threats.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-gray-500 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Risk Factors */}
                <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6 border-t-4 border-red-500">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                        <span>Risk Factors</span>
                        <span className="text-2xl">⚠️</span>
                    </h3>
                    <RiskSection risks={recommendation.risks} />
                </div>

                {/* Feasibility Analysis */}
                <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6 border-t-4 border-yellow-500">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                        <span>Feasibility Study</span>
                        <span className="text-2xl">🔍</span>
                    </h3>
                    <FeasibilitySection feasibility={recommendation.feasibility} />
                </div>

                {/* Alternative Recommendations */}
                <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6 border-t-4 border-purple-500">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                        <span>Alternative Approaches</span>
                        <span className="text-2xl">💡</span>
                    </h3>
                    <AlternativesSection alternatives={recommendation.alternatives} />
                </div>
            </div>
        </div>
    );
}