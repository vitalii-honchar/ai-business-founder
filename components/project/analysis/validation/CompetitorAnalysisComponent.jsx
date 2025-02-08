import { HiInformationCircle } from 'react-icons/hi';

function formatNumber(num) {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
}

function CompetitorCard({ competitor }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-bold text-gray-800">{competitor.name}</h3>
                <div className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                    competitor.effectiveness === 'high' ? 'bg-green-100 text-green-800' :
                    competitor.effectiveness === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {competitor.effectiveness} effectiveness
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                    <p className="text-xs sm:text-sm text-gray-500">Users</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">{formatNumber(competitor.user_base)}</p>
                </div>
                <div>
                    <p className="text-xs sm:text-sm text-gray-500">Revenue</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">${formatNumber(competitor.revenue)}</p>
                </div>
                <div>
                    <p className="text-xs sm:text-sm text-gray-500">Growth Rate</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">
                        {competitor.growth_rate}%
                    </p>
                </div>
                <div>
                    <p className="text-xs sm:text-sm text-gray-500">User Growth</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">
                        {competitor.user_growth_rate}%
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Platform</p>
                    <div className="flex gap-2 mt-1">
                        {competitor.platform.map((p, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs sm:text-sm text-gray-600">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Main Feature</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{competitor.main_feature}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Pros</p>
                        <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                            {competitor.pros.map((pro, i) => (
                                <li key={i}>{pro}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Cons</p>
                        <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                            {competitor.cons.map((con, i) => (
                                <li key={i}>{con}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Customer Satisfaction</p>
                    <div className="mt-1 bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-green-500 rounded-full h-2"
                            style={{ width: `${competitor.customer_satisfaction * 10}%` }}
                        />
                    </div>
                </div>

                {competitor.failed_attempts?.length > 0 && (
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700">Failed Attempts</p>
                        <ul className="mt-1 space-y-1">
                            {competitor.failed_attempts.map((attempt, i) => (
                                <li key={i} className="text-xs sm:text-sm text-gray-600">
                                    {attempt}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {competitor.entry_barriers?.length > 0 && (
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700">Entry Barriers</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {competitor.entry_barriers.map((barrier, i) => (
                                <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">
                                    {barrier}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Market Maturity</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {competitor.market_maturity}
                    </p>
                </div>

                {competitor.resource_requirements?.length > 0 && (
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700">Resource Requirements</p>
                        <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                            {competitor.resource_requirements.map((req, i) => (
                                <li key={i}>{req}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-500">Status: {competitor.public_status}</span>
                        <span className="text-gray-500">Ownership: {competitor.ownership.join(', ')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SwotTable({ swotAnalysis }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">SWOT Analysis</h2>
            <div className="space-y-6 sm:space-y-8">
                {swotAnalysis.map((analysis, index) => (
                    <div key={index} className={`${index > 0 ? 'pt-6 sm:pt-8 border-t border-gray-200' : ''}`}>
                        <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">
                            {analysis.competitor || 'Competitor Analysis'}
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
                            <div className="bg-green-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow">
                                <h4 className="text-sm sm:text-base font-semibold text-green-700 mb-2 sm:mb-3">Strengths</h4>
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                                    {analysis.strengths.map((item, i) => (
                                        <li key={i} className="leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow">
                                <h4 className="text-sm sm:text-base font-semibold text-red-700 mb-2 sm:mb-3">Weaknesses</h4>
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                                    {analysis.weaknesses.map((item, i) => (
                                        <li key={i} className="leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow">
                                <h4 className="text-sm sm:text-base font-semibold text-blue-700 mb-2 sm:mb-3">Opportunities</h4>
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                                    {analysis.opportunities.map((item, i) => (
                                        <li key={i} className="leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow">
                                <h4 className="text-sm sm:text-base font-semibold text-yellow-700 mb-2 sm:mb-3">Threats</h4>
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                                    {analysis.threats.map((item, i) => (
                                        <li key={i} className="leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MarketAnalysis({ marketAnalysis }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Market Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-base font-semibold mb-3">Market Saturation</h3>
                    <p className="text-sm text-gray-700">{marketAnalysis.saturation_level}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-base font-semibold mb-3">Entry Barriers</h3>
                    <div className="space-y-2">
                        {marketAnalysis.entry_barriers.map((barrier, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                <span className="text-sm text-gray-700">{barrier}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-base font-semibold mb-3">Success Patterns</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {marketAnalysis.success_patterns.map((pattern, i) => (
                            <li key={i}>{pattern}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-base font-semibold mb-3">Failure Patterns</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {marketAnalysis.failure_patterns.map((pattern, i) => (
                            <li key={i}>{pattern}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg col-span-full">
                    <h3 className="text-base font-semibold mb-3">Competitive Edge Sustainability</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <h4 className="text-sm font-medium mb-2">Time to Market Impact</h4>
                            <p className="text-sm text-gray-700">
                                {marketAnalysis.competitive_edge_sustainability.time_to_market_impact}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-2">Resource Gaps</h4>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {marketAnalysis.competitive_edge_sustainability.resource_gaps.map((gap, i) => (
                                    <li key={i}>{gap}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-2">Defense Strategy</h4>
                            <p className="text-sm text-gray-700">
                                {marketAnalysis.competitive_edge_sustainability.defense_strategy}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CompetitorAnalysisComponent({ competitorAnalysis }) {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {competitorAnalysis.competitors.map((competitor, index) => (
                    <CompetitorCard key={index} competitor={competitor} />
                ))}
            </div>

            <SwotTable swotAnalysis={competitorAnalysis.swot_analysis} />
            
            {competitorAnalysis.market_analysis && (
                <MarketAnalysis marketAnalysis={competitorAnalysis.market_analysis} />
            )}
        </>
    );
}