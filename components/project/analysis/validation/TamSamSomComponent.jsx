import { HiInformationCircle, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useState } from 'react';

const formatNumber = (num) => {
    if (!num) return '0';
    
    // For millions
    if (num >= 1000000) {
        const millions = (num / 1000000);
        return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
    }
    
    // For thousands
    if (num >= 1000) {
        const thousands = (num / 1000);
        return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(1)}K`;
    }
    
    // For hundreds and smaller
    return num.toLocaleString();
};

const formatMoney = (num) => {
    if (!num) return '$0';
    
    // For billions
    if (num >= 1000000000) {
        const billions = (num / 1000000000);
        return `$${billions % 1 === 0 ? billions : billions.toFixed(1)}B`;
    }
    
    // For millions
    if (num >= 1000000) {
        const millions = (num / 1000000);
        return `$${millions % 1 === 0 ? millions : millions.toFixed(1)}M`;
    }
    
    // For thousands
    if (num >= 1000) {
        const thousands = (num / 1000);
        return `$${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}K`;
    }
    
    // For hundreds and smaller
    return `$${num.toLocaleString()}`;
};

const MarketCard = ({ title, data, color, definition }) => {
    const titleEmojis = {
        "Total Addressable Market": "🌍",
        "Serviceable Available Market": "🎯",
        "Serviceable Obtainable Market": "🎪"
    };

    return (
        <div className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-${color}-500 w-full overflow-hidden`}>
            <div className="flex items-center mb-2 sm:mb-4">
                <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 bg-${color}-100 text-${color}-600`}>
                    {titleEmojis[title] || title.split(' ').map(word => word[0]).join('')}
                </div>
                <div className="flex items-center">
                    <h3 className="text-md sm:text-lg font-semibold text-gray-800">{title}</h3>
                    <div className="group relative ml-1 sm:ml-2">
                        <HiInformationCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                        <div className="invisible group-hover:visible absolute left-0 z-10 w-48 sm:w-64 p-2 mt-1 text-xs sm:text-sm text-white bg-gray-900 rounded-md shadow-lg">
                            {definition}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2 sm:space-y-4">
                <div>
                    <p className="text-xs sm:text-sm text-gray-500">👥 Users</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatNumber(data.number_of_users)}</p>
                </div>
                <div>
                    <p className="text-xs sm:text-sm text-gray-500">💰 Revenue Potential</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatMoney(data.amount_of_money)}</p>
                </div>
                {data.price_per_user && (<div>
                    <p className="text-xs sm:text-sm text-gray-500">💵 Price per User</p>
                    <p className="text-md sm:text-lg font-semibold text-gray-800">{formatMoney(data.price_per_user)}</p>
                </div>)}
                {data.main_restrictions && (
                    <div className="mt-2 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-md">
                        <p className="text-xs sm:text-sm text-gray-600">{data.main_restrictions}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const MarketLandscape = ({ data }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-6 sm:mt-8 transition-all hover:shadow-xl w-full overflow-hidden">
            <div className="flex flex-wrap items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">🏢 Market Landscape</h2>
                <div className="text-sm text-gray-500">
                    {data.updated_at && `Last updated: ${new Date(data.updated_at).toLocaleDateString()}`}
                </div>
            </div>

            <div className="mt-4 sm:mt-6 space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 gap-4 sm:gap-8 max-w-full">
                    {/* Demographics Section */}
                    <div className="bg-gray-50 p-4 rounded-lg w-full overflow-hidden">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <span>👥 Demographics</span>
                            <span className="ml-2 text-sm text-gray-500">{data.demographics?.length} segments</span>
                        </h3>
                        <div className="space-y-3">
                            {data.demographics?.map((item, index) => (
                                <div key={index} 
                                     className="flex justify-between py-2 px-3 hover:bg-white rounded transition-colors">
                                    <span className="text-gray-600">{item.name}</span>
                                    <span className="font-medium">{formatNumber(item.value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Size Section */}
                    <div className="bg-gray-50 p-4 rounded-lg w-full overflow-hidden">
                        <h3 className="text-lg font-semibold mb-4">📊 Market Size</h3>
                        <div className="flex flex-col space-y-2">
                            <p className="text-3xl font-bold text-green-600">
                                {formatMoney(data.market_size)}
                            </p>
                            <div className="flex items-center text-gray-600">
                                <span>📈 Growth Rate: </span>
                                <span className={`ml-2 font-semibold ${
                                    data.growth_rate > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {data.growth_rate > 0 ? '+' : ''}{data.growth_rate}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Opportunities and Risks Grid */}
                <div className="grid grid-cols-1 gap-4 sm:gap-8 max-w-full overflow-hidden">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                            <span>✨ Opportunities</span>
                            <span className="ml-2 px-2 py-1 text-sm bg-green-100 text-green-700 rounded">
                                {data.opportunities?.length}
                            </span>
                        </h3>
                        <ul className="list-disc pl-5 space-y-3">
                            {data.opportunities?.map((item, index) => (
                                <li key={index} className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                            <span>⚠️ Risks</span>
                            <span className="ml-2 px-2 py-1 text-sm bg-red-100 text-red-700 rounded">
                                {data.risks?.length}
                            </span>
                        </h3>
                        <ul className="list-disc pl-5 space-y-3">
                            {data.risks?.map((item, index) => (
                                <li key={index} className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

function MarketReadinessSection({ readiness }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">🎯 Market Readiness</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Payment Willingness */}
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">💳 Payment Willingness</h3>
                    <p className="text-sm text-gray-700">{readiness.payment_willingness}</p>
                </div>

                {/* Price Sensitivity */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">💰 Price Sensitivity</h3>
                    <p className="text-sm text-gray-700">{readiness.price_sensitivity}</p>
                </div>

                {/* Adoption Barriers */}
                <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">🚧 Adoption Barriers</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {readiness.adoption_barriers.map((barrier, i) => (
                            <li key={i}>{barrier}</li>
                        ))}
                    </ul>
                </div>

                {/* Education Needs */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">📚 Education Needs</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {readiness.education_needs.map((need, i) => (
                            <li key={i}>{need}</li>
                        ))}
                    </ul>
                </div>

                {/* Decision Factors */}
                <div className="bg-purple-50 p-4 rounded-lg col-span-full">
                    <h3 className="font-medium text-gray-800 mb-2">🤔 Purchase Decision Factors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {readiness.decision_factors.map((factor, i) => (
                            <div key={i} className="bg-white p-2 rounded">
                                <p className="text-sm text-gray-700">{factor}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RiskAdjustmentsSection({ risks }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">⚖️ Risk Adjustments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Market Timing */}
                <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">⏰ Market Timing</h3>
                    <p className="text-sm text-gray-700">{risks.market_timing}</p>
                </div>

                {/* Resource Adequacy */}
                <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">🔋 Resource Adequacy</h3>
                    <p className="text-sm text-gray-700">{risks.resource_adequacy}</p>
                </div>

                {/* Competition Impact */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">🥊 Competition Impact</h3>
                    <p className="text-sm text-gray-700">{risks.competition_impact}</p>
                </div>

                {/* Regulatory Risks */}
                <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">⚖️ Regulatory Risks</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {risks.regulatory_risks.map((risk, i) => (
                            <li key={i}>{risk}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function TamSamSomComponent({ tamSamSom }) {
    return (
        <div className="w-full max-w-full overflow-hidden space-y-4 sm:space-y-6">
            {/* TAM/SAM/SOM Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                <MarketCard
                    title={"Total Addressable Market"}
                    data={tamSamSom.total_addressable_market}
                    color={'green'}
                    definition={"Total available market if 100% market share was achieved"}
                />
                <MarketCard
                    title={"Serviceable Available Market"}
                    data={tamSamSom.serviceable_available_market}
                    color={'green'}
                    definition={"Market segment that can be reached through current business model"}
                />
                <MarketCard
                    title={"Serviceable Obtainable Market"}
                    data={tamSamSom.serviceable_obtainable_market}
                    color={'green'}
                    definition={"Realistic portion of SAM that can be captured"}
                />
            </div>

            {/* Market Analysis Sections */}
            <MarketLandscape data={tamSamSom.market_landscape} />
            
            {tamSamSom.market_landscape.market_readiness && (
                <MarketReadinessSection readiness={tamSamSom.market_landscape.market_readiness} />
            )}
            
            {tamSamSom.market_landscape.risk_adjustments && (
                <RiskAdjustmentsSection risks={tamSamSom.market_landscape.risk_adjustments} />
            )}
        </div>
    );
}