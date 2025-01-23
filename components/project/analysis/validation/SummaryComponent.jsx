export default function SummaryComponent({ summary }) {
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
    
    return (
        <div className="space-y-4 md:space-y-6 md:p-4">
            {/* Recommendation Card */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-4">
                    <h2 className="text-lg md:text-xl font-semibold">Validation Summary</h2>
                    <span className={`mt-2 md:mt-0 px-2 py-1 md:px-3 md:py-1 rounded-full text-sm ${
                        recommendation.valid 
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

            {/* Similar Problems */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Similar Problems</h2>
                <div className="space-y-2 md:space-y-4">
                    {similar_problems.map((problem, index) => (
                        <div key={index} className="border-b last:border-b-0 pb-2 md:pb-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1 md:mb-2">
                                <h3 className="font-medium">{problem.name}</h3>
                                <div className="flex items-center mt-2 md:mt-0">
                                    <span className="text-sm text-gray-600 mr-2">Worth solving:</span>
                                    <span className={`text-sm font-medium ${getScoreTextColor(problem.worth_solving)}`}>
                                        {problem.worth_solving}/10
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{problem.explanation}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}