'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import projecApi from '@/lib/client/api/project_api';

export default function SummaryComponent({ summary }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleProblemClick = async (userInput) => {
        try {
            setLoading(true);
            setError(null);
            const newProject = await projecApi.createProject(userInput);
            // Open in new tab
            window.open(`/application/project/${newProject.id}`, '_blank');
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
        <div className="">
            {/* Recommendation Card */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-4">
                    <h2 className="text-lg md:text-xl font-semibold">Validation Summary</h2>
                    <span className={`mt-2 md:mt-0 px-2 py-1 md:px-3 md:py-1 rounded-full text-sm ${recommendation.valid
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {recommendation.valid ? 'Valid' : 'Invalid'}
                    </span>
                </div>

                <p className="text-gray-600 mb-2 md:mb-4">{recommendation.explanation}</p>

                {/* Worth Solving Score */}
                <div className="mb-4 md:mb-6">
                    <div className="flex justify-between mb-1 md:mb-2">
                        <span className="text-sm font-medium">Worth Solving Score</span>
                        <span className={`text-sm font-medium ${getScoreTextColor(recommendation.worth_solving)}`}>
                            {recommendation.worth_solving}/10
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`${getScoreColor(recommendation.worth_solving)} rounded-full h-2 transition-all duration-300`}
                            style={{ width: `${recommendation.worth_solving * 10}%` }}
                        />
                    </div>
                </div>

                {/* SWOT Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
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
                            {recommendation.swot_analysis.strengths.map((item, index) => (
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

            {/* Similar Problems */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6 mt-8">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Similar Problems</h2>
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}
                <div className="space-y-2 md:space-y-4">
                    {similar_problems.map((problem, index) => (
                        <div key={index} className="group relative">
                            {/* Button */}
                            <button
                                onClick={() => handleProblemClick(problem.user_input)}
                                disabled={loading}
                                className="w-full text-left border border-transparent pb-2 md:pb-4 transition-all duration-200 
                                    hover:border-blue-100 hover:bg-blue-50/50 rounded-lg p-3 
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-transparent
                                    group-hover:shadow-md group-hover:scale-[1.01] transform
                                    relative flex flex-col
                                    before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-200
                                    hover:before:border-blue-400 before:transition-colors"
                            >
                                {/* Add "Click to use" indicator */}
                                <div className="absolute top-3 right-3 text-xs text-gray-400 flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>Click to use</span>
                                </div>

                                {/* Existing content with adjusted padding for the indicator */}
                                <div className="pr-24">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1 md:mb-2">
                                        <h3 className="font-medium group-hover:text-blue-700 transition-colors duration-200">
                                            {problem.name}
                                        </h3>
                                        <div className="flex items-center mt-2 md:mt-0">
                                            {loading ? (
                                                <div className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span className="text-sm text-blue-600">Creating project...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-sm text-gray-600 mr-2 group-hover:text-gray-700">
                                                        Worth solving:
                                                    </span>
                                                    <span className={`text-sm font-medium ${getScoreTextColor(problem.worth_solving)} group-hover:opacity-90`}>
                                                        {problem.worth_solving}/10
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 group-hover:text-gray-700">
                                        {problem.explanation}
                                    </p>
                                </div>
                            </button>
                            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 
                                top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 
                                text-sm text-white bg-gray-900 rounded-lg transition-all duration-200 
                                whitespace-nowrap z-10">
                                Click to create a new project based on this recommendation
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2">
                                    <div className="border-solid border-b-gray-900 border-b-8 border-x-transparent border-x-8 border-t-0"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}