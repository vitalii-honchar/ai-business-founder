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

function RevenueValidation({ revenue }) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Monthly Revenue</div>
                    <div className="text-2xl font-bold text-blue-700">
                        {formatNumber(revenue.calculation.monthly_recurring_revenue)} {revenue.currency}
                    </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Annual Revenue</div>
                    <div className="text-2xl font-bold text-green-700">
                        {formatNumber(revenue.calculation.annual_recurring_revenue)} {revenue.currency}
                    </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Market Size</div>
                    <div className="text-2xl font-bold text-purple-700">
                        {formatNumber(revenue.calculation.total_addressable_market)} {revenue.currency}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium mb-2">Key Metrics</div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total Users</span>
                            <span className="font-medium">{formatNumber(revenue.calculation.total_users)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Revenue/User</span>
                            <span className="font-medium">{formatNumber(revenue.calculation.revenue_per_user)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Churn Rate</span>
                            <span className="font-medium">
                                {(revenue.calculation.churn_rate * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium mb-2">Validation Status</div>
                    <div className="space-y-2">
                        {Object.entries(revenue.validation_checks).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                                <span className={value ? 'text-green-500' : 'text-red-500'}>
                                    {value ? '✓' : '×'}
                                </span>
                                <span className="text-sm text-gray-600">
                                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium mb-2">Confidence Score</div>
                    <div className="text-3xl font-bold text-blue-600">
                        {revenue.confidence_score}/10
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        Timeline: {revenue.timeline}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium mb-2">Validation Steps</div>
                    <div className="space-y-2">
                        {revenue.verification_steps.map((step, index) => (
                            <div key={index} className="text-sm text-gray-600">• {step}</div>
                        ))}
                    </div>
                </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map(({ key, label, icon, color }) => (
                <div key={key} className={`bg-${color}-50 p-4 rounded-lg border border-${color}-100`}>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">{icon}</span>
                        {label}
                    </h3>
                    <ul className="space-y-2">
                        {swot[key].map((item, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
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

export default function SummaryComponent({ summary, readOnly }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!summary?.recommendation) {
        return <div className="p-4 text-center text-gray-500">No validation data available</div>;
    }

    const { recommendation } = summary;

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            Project Validation Summary
                            <span className="text-2xl">🎯</span>
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">{recommendation.explanation}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                        recommendation.valid ? 
                        'bg-green-100 text-green-800' : 
                        'bg-amber-100 text-amber-800'
                    }`}>
                        {recommendation.valid ? '✅ Valid' : '⚠️ Needs Improvement'}
                    </div>
                </div>
            </div>

            {/* Final Verdict */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Final Verdict
                    <span className="text-2xl">⚖️</span>
                </h2>
                <ValidationDecision decision={recommendation.validation_decision} />
            </div>

            {/* Problem Validation Scores */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Problem Validation Scores
                    <span className="text-2xl">📊</span>
                </h2>
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

            {/* Revenue Validation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Revenue Validation
                    <span className="text-2xl">💰</span>
                </h2>
                <RevenueValidation revenue={recommendation.revenue_validation} />
            </div>

            {/* Problem Evidence */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Problem Evidence
                    <span className="text-2xl">🔍</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Object.entries(recommendation.problem_evidence).map(([key, value]) => {
                        if (Array.isArray(value) && value.length > 0) {
                            return (
                                <div key={key} className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-3">
                                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </h3>
                                    <ul className="space-y-2">
                                        {value.map((item, index) => (
                                            <li key={index} className="text-sm text-gray-600">• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            {/* Validation Gaps */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Validation Gaps
                    <span className="text-2xl">⚠️</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(recommendation.validation_gaps).map(([key, value]) => (
                        <div key={key} className="bg-yellow-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-900 mb-3">
                                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h3>
                            <ul className="space-y-2">
                                {value.map((item, index) => (
                                    <li key={index} className="text-sm text-gray-600">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* SWOT Analysis */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Problem SWOT Analysis
                    <span className="text-2xl">📊</span>
                </h2>
                <SwotAnalysis swot={recommendation.problem_swot_analysis} />
            </div>
        </div>
    );
}