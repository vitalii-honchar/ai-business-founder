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

export default function CompetitorAnalysisComponent({ competitorAnalysis }) {
    return (
        <div className="w-full max-w-7xl mx-auto sm:p-4 space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Competitor Analysis</h2>
                <div className="group relative">
                    <HiInformationCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    <div className="invisible group-hover:visible absolute right-0 w-40 sm:w-48 p-2 mt-1 text-xs sm:text-sm text-white bg-gray-900 rounded-md shadow-lg">
                        Analysis of top competitors in the market
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {competitorAnalysis.competitors.map((competitor, index) => (
                    <CompetitorCard key={index} competitor={competitor} />
                ))}
            </div>

            <SwotTable swotAnalysis={competitorAnalysis.swot_analysis} />
        </div>
    );
}