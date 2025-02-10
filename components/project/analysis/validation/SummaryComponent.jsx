'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function formatNumber(num) {
    if (num == null) {
        return 'N/A';
    }
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
}

// Reusable components
function ScoreCard({ label, score }) {
    const getScoreConfig = (score) => {
        if (score >= 8) return { bg: 'bg-green-50', text: 'text-green-700', bar: 'bg-green-500', label: 'Excellent' };
        if (score >= 6) return { bg: 'bg-blue-50', text: 'text-blue-700', bar: 'bg-blue-500', label: 'Good' };
        if (score >= 4) return { bg: 'bg-yellow-50', text: 'text-yellow-700', bar: 'bg-yellow-500', label: 'Fair' };
        return { bg: 'bg-red-50', text: 'text-red-700', bar: 'bg-red-500', label: 'Poor' };
    };

    const config = getScoreConfig(score || 0);

    return (
        <div className={`${config.bg} rounded-lg p-4`}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.text}`}>
                    {config.label}
                </span>
            </div>
            <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${config.text}`}>{score || 0}</span>
                <span className="text-sm text-gray-500">/10</span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${config.bar}`} style={{ width: `${(score || 0) * 10}%` }} />
            </div>
        </div>
    );
}

function ValidationDecision({ decision }) {
    const getDecisionColor = (decision) => {
        switch (decision?.toLowerCase()) {
            case 'go': return 'green';
            case 'no go': return 'red';
            default: return 'yellow';
        }
    };

    const color = getDecisionColor(decision.decision);

    return (
        <div className="space-y-4">
            <div className={`bg-${color}-50 rounded-lg p-4`}>
                <div className="flex justify-between items-center">
                    <span className={`text-xl font-bold text-${color}-700`}>
                        {decision.decision || 'NO GO'}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Confidence:</span>
                        <span className={`font-bold text-${color}-700`}>
                            {decision.confidence_score}/10
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Key Factors</h4>
                    <ul className="space-y-1">
                        {decision.key_findings.map((finding, index) => (
                            <li key={index} className="text-sm text-gray-600">• {finding}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Critical Prerequisites</h4>
                    <ul className="space-y-1">
                        {decision.critical_gaps.map((gap, index) => (
                            <li key={index} className="text-sm text-gray-600">• {gap}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Recommended Next Steps</h4>
                    <ul className="space-y-1">
                        {decision.recommended_validation_steps.map((step, index) => (
                            <li key={index} className="text-sm text-gray-600">• {step}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Risk & Resource Assessment</h4>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Risk Assessment:</span> {decision.risk_assessment}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Evidence Strength:</span> {decision.evidence_strength}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RevenueValidation({ revenueValidation, userInput, tamSamSom }) {
    if (!revenueValidation) {
        return <div className="p-4 text-center text-gray-500">No revenue validation data available</div>;
    }

    return (
        <div className="space-y-4">
            {/* Revenue Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Target Revenue */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Target Revenue</div>
                    <div className="text-2xl font-bold text-blue-700">
                        ${formatNumber(userInput?.targetRevenue || 0)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{userInput.targetRevenueRecurring}</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Realistic Revenue</div>
                    <div className="text-2xl font-bold text-green-700">
                        ${formatNumber(revenueValidation.realistic_revenue || 0)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{userInput.targetRevenueRecurring}</div>
                </div>

                {/* Potential Revenue */}
                <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Market Potential</div>
                    <div className="text-2xl font-bold text-purple-700">
                        ${formatNumber(tamSamSom?.market_landscape?.market_revenue || 0)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{userInput.targetRevenueRecurring}</div>
                </div>
            </div>

            {/* Market Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Users and Probability */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium mb-3">Market Metrics</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Potential Users</span>
                            <span className="font-medium">
                                {formatNumber(tamSamSom?.market_landscape?.market_size || 0)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Success Probability</span>
                            <span className="font-medium text-blue-600">
                                {((revenueValidation.probability_of_achieving_revenue || 0) * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Revenue per User */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium mb-3">Revenue Metrics</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Revenue/User</span>
                            <span className="font-medium">
                                ${formatNumber((tamSamSom?.market_landscape?.market_revenue || 0) / 
                                    (tamSamSom?.market_landscape?.market_size || 1))}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Target Achievement</span>
                            <span className={`font-medium ${revenueValidation.realistic_revenue >= (userInput?.targetRevenue || 0) 
                                ? 'text-green-600' 
                                : 'text-red-600'}`}>
                                {((revenueValidation.realistic_revenue / (userInput?.targetRevenue || 1)) * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue Analysis */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium mb-3">Revenue Achievement Analysis</h3>
                <div className="space-y-3">
                    <p className="text-sm text-gray-600">{revenueValidation.explanation || 'No explanation available'}</p>
                    <div className="space-y-2">
                        {(revenueValidation.reasons || []).map((reason, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span className="text-sm text-gray-600">{reason}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChallengesSection({ challenges }) {
    if (!challenges || challenges.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    Key Challenges
                    <span className="text-xl">🎯</span>
                </h3>
                <div className="text-sm text-gray-500 text-center p-4">
                    No challenges identified
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                Key Challenges
                <span className="text-xl">🎯</span>
            </h3>
            <div className="space-y-2">
                {(challenges || []).map((challenge, index) => (
                    <div 
                        key={index} 
                        className="flex items-start gap-2 bg-red-50 p-3 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                    >
                        <span className="text-red-500 mt-1">⚠️</span>
                        <span className="text-sm text-gray-700">{challenge}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SwotAnalysis({ swot }) {
    const sections = [
        { key: 'strengths', label: 'Strengths', icon: '💪', color: 'green' },
        { key: 'weaknesses', label: 'Weaknesses', icon: '⚠️', color: 'red' },
        { key: 'opportunities', label: 'Opportunities', icon: '🎯', color: 'blue' },
        { key: 'threats', label: 'Threats', icon: '⚡', color: 'yellow' }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map(({ key, label, icon, color }) => (
                <div key={key} className={`bg-${color}-50 p-3 sm:p-4 rounded-lg border border-${color}-100`}>
                    <h3 className="font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <span className="text-lg sm:text-xl">{icon}</span>
                        {label}
                    </h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                        {swot[key].map((item, index) => (
                            <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                                <span className={`text-${color}-500 mt-1`}>•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function WorthSolvingSection({ worthSolving, explanation }) {
    const getScoreColor = (score) => {
        if (score >= 8) return 'border-green-500 bg-green-50';
        if (score >= 6) return 'border-blue-500 bg-blue-50';
        if (score >= 4) return 'border-yellow-500 bg-yellow-50';
        return 'border-red-500 bg-red-50';
    };

    return (
        <div className={`rounded-lg shadow-sm p-3 sm:p-6 ${getScoreColor(worthSolving)}`}>
            <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">Worth Solving Score</h3>
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">{worthSolving}/10</span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 whitespace-pre-wrap">{explanation}</p>
                </div>
            </div>
        </div>
    );
}

function RevenueValidationSection({ revenueValidation }) {
    const { probability_of_achieving_revenue, explanation } = revenueValidation;
    
    const getProbabilityColor = (prob) => {
        if (prob >= 0.8) return 'bg-green-600';
        if (prob >= 0.6) return 'bg-blue-600';
        if (prob >= 0.4) return 'bg-yellow-600';
        return 'bg-red-600';
    };
    
    return (
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Revenue Probability</h3>
            <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-1 bg-gray-200 h-3 sm:h-4 rounded-full">
                        <div 
                            className={`h-full rounded-full ${getProbabilityColor(probability_of_achieving_revenue)}`}
                            style={{ width: `${probability_of_achieving_revenue * 100}%` }}
                        />
                    </div>
                    <span className="font-bold text-gray-700 w-14 sm:w-16 text-xs sm:text-sm">
                        {(probability_of_achieving_revenue * 100).toFixed(1)}%
                    </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">{explanation}</p>
            </div>
        </div>
    );
}

function ValidationGapsSection({ gaps }) {
    const categories = [
        { key: 'missing_evidence', label: 'Missing Evidence', icon: '🔍' },
        { key: 'assumption_risks', label: 'Assumption Risks', icon: '⚠️' },
        { key: 'data_needs', label: 'Data Needs', icon: '📊' },
        { key: 'validation_requirements', label: 'Validation Requirements', icon: '✓' }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {categories.map(({ key, label, icon }) => (
                <div key={key} className="bg-white rounded-lg shadow p-3 sm:p-4">
                    <h3 className="font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <span>{icon}</span>
                        {label}
                    </h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                        {gaps[key].map((item, index) => (
                            <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function ProblemEvidenceSection({ evidence }) {
    const categories = [
        { key: 'validation_interviews', label: 'Validation Interviews', icon: '🗣️' },
        { key: 'data_points', label: 'Data Points', icon: '📈' },
        { key: 'user_feedback', label: 'User Feedback', icon: '💭' },
        { key: 'market_signals', label: 'Market Signals', icon: '📊' },
        { key: 'current_solutions', label: 'Current Solutions', icon: '🛠️' },
        { key: 'problem_costs', label: 'Problem Costs', icon: '💰' }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {categories.map(({ key, label, icon }) => (
                <div key={key} className="bg-white rounded-lg shadow p-3 sm:p-4">
                    <h3 className="font-medium text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <span>{icon}</span>
                        {label}
                    </h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                        {evidence[key].map((item, index) => (
                            <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            
            {/* Special handling for string fields */}
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 col-span-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Occurrence Frequency</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{evidence.occurrence_frequency}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Impact Assessment</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{evidence.impact_assessment}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SummaryComponent({ summary, userInput, tamSamSom, readOnly }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!summary?.recommendation) {
        return <div className="p-4 text-center text-gray-500">No validation data available</div>;
    }

    const { recommendation } = summary;

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {/* Worth Solving Score Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Worth Solving Score</h1>
                        <p className="text-white/90">{recommendation.worth_solving_explanation}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg">
                        <span className="text-3xl font-bold">{recommendation.worth_solving}</span>
                        <span className="text-lg">/10</span>
                    </div>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ValidationDecision decision={recommendation.validation_decision} />
                <RevenueValidation 
                    revenueValidation={recommendation.revenue_validation}
                    userInput={userInput}
                    tamSamSom={tamSamSom}
                />
                <ChallengesSection challenges={recommendation.worth_solving_challenges} />
            </div>

            {/* Problem Validation Scores */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Problem Validation Scores</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(recommendation.scores).map(([key, value]) => (
                        <ScoreCard 
                            key={key}
                            label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            score={value}
                        />
                    ))}
                </div>
            </div>

            {/* SWOT Analysis */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Strategic Analysis</h2>
                <SwotAnalysis swot={recommendation.problem_swot_analysis} />
            </div>

            {/* Validation Gaps & Evidence */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Critical Gaps & Risks</h2>
                    <ValidationGapsSection gaps={recommendation.validation_gaps} />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Supporting Evidence</h2>
                    <ProblemEvidenceSection evidence={recommendation.problem_evidence} />
                </div>
            </div>
        </div>
    );
}