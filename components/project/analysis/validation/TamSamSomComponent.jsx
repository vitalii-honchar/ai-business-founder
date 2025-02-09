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

const MarketCard = ({ title, data, color, definition }) => (
    <div className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-${color}-500 w-full overflow-hidden`}>
        <div className="flex items-center mb-2 sm:mb-4">
            <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 bg-${color}-100 text-${color}-600`}>
                {title.split(' ').map(word => word[0]).join('')}
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
                <p className="text-xs sm:text-sm text-gray-500">Users</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatNumber(data.number_of_users)}</p>
            </div>
            <div>
                <p className="text-xs sm:text-sm text-gray-500">Revenue Potential</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatMoney(data.amount_of_money)}</p>
            </div>
            {data.price_per_user && (<div>
                <p className="text-xs sm:text-sm text-gray-500">Price per User</p>
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

const MarketLandscape = ({ data }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-6 sm:mt-8 transition-all hover:shadow-xl w-full overflow-hidden">
            <div className="flex flex-wrap items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Market Landscape</h2>
                <div className="text-sm text-gray-500">
                    {data.updated_at && `Last updated: ${new Date(data.updated_at).toLocaleDateString()}`}
                </div>
            </div>

            <div className="mt-4 sm:mt-6 space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 gap-4 sm:gap-8 max-w-full">
                    {/* Demographics Section */}
                    <div className="bg-gray-50 p-4 rounded-lg w-full overflow-hidden">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <span>Demographics</span>
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
                        <h3 className="text-lg font-semibold mb-4">Market Size</h3>
                        <div className="flex flex-col space-y-2">
                            <p className="text-3xl font-bold text-green-600">
                                {formatMoney(data.market_size)}
                            </p>
                            <div className="flex items-center text-gray-600">
                                <span>Growth Rate: </span>
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
                            <span>Opportunities</span>
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
                            <span>Risks</span>
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Market Readiness</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Payment Willingness */}
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Payment Willingness</h3>
                    <p className="text-sm text-gray-700">{readiness.payment_willingness}</p>
                </div>

                {/* Price Sensitivity */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Price Sensitivity</h3>
                    <p className="text-sm text-gray-700">{readiness.price_sensitivity}</p>
                </div>

                {/* Adoption Barriers */}
                <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Adoption Barriers</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {readiness.adoption_barriers.map((barrier, i) => (
                            <li key={i}>{barrier}</li>
                        ))}
                    </ul>
                </div>

                {/* Education Needs */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Education Needs</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {readiness.education_needs.map((need, i) => (
                            <li key={i}>{need}</li>
                        ))}
                    </ul>
                </div>

                {/* Decision Factors */}
                <div className="bg-purple-50 p-4 rounded-lg col-span-full">
                    <h3 className="font-medium text-gray-800 mb-2">Purchase Decision Factors</h3>
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Risk Adjustments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Market Timing */}
                <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Market Timing</h3>
                    <p className="text-sm text-gray-700">{risks.market_timing}</p>
                </div>

                {/* Resource Adequacy */}
                <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Resource Adequacy</h3>
                    <p className="text-sm text-gray-700">{risks.resource_adequacy}</p>
                </div>

                {/* Competition Impact */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Competition Impact</h3>
                    <p className="text-sm text-gray-700">{risks.competition_impact}</p>
                </div>

                {/* Regulatory Risks */}
                <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Regulatory Risks</h3>
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

function TargetRevenueFeasibilitySection({ feasibility }) {
    if (!feasibility) return null;

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Target Revenue Feasibility</h2>
            
            {/* Main Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Achievable?</p>
                    <div className="flex items-center mt-1">
                        <span className={`text-lg font-bold ${
                            feasibility.is_achievable ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {feasibility.is_achievable ? 'Yes' : 'No'}
                        </span>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="text-lg font-bold text-gray-800">
                        {feasibility.timeline_months} months
                    </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Required Market Share</p>
                    <p className="text-lg font-bold text-gray-800">
                        {feasibility.required_market_share}%
                    </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Monthly Penetration</p>
                    <p className="text-lg font-bold text-gray-800">
                        {feasibility.monthly_penetration_rate}%
                    </p>
                </div>
            </div>

            {/* Customer Acquisition Requirements */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Customer Acquisition Requirements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Monthly New Customers</p>
                        <p className="text-lg font-bold text-gray-800">
                            {formatNumber(feasibility.customer_acquisition_requirements.monthly_new_customers)}
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-600">CAC</p>
                        <p className="text-lg font-bold text-gray-800">
                            ${formatNumber(feasibility.customer_acquisition_requirements.estimated_cac)}
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Total Cost</p>
                        <p className="text-lg font-bold text-gray-800">
                            ${formatNumber(feasibility.customer_acquisition_requirements.total_acquisition_cost)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Monthly Projections */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Monthly Projections</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-600">
                                <th className="pb-2">Month</th>
                                <th className="pb-2">Revenue</th>
                                <th className="pb-2">Customers</th>
                                <th className="pb-2">Market Share</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feasibility.monthly_projections.map((projection, index) => (
                                <tr key={index} className="border-t border-gray-200">
                                    <td className="py-2">{projection.month}</td>
                                    <td className="py-2">{formatMoney(projection.revenue)}</td>
                                    <td className="py-2">{formatNumber(projection.customer_base)}</td>
                                    <td className="py-2">{projection.market_share}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Requirements and Challenges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Operational Requirements */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 mb-2">Operational Requirements</h3>
                    {feasibility.operational_requirements.map((req, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                            {req}
                        </div>
                    ))}
                </div>

                {/* Revenue Blockers */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 mb-2">Revenue Blockers</h3>
                    {feasibility.revenue_blockers.map((blocker, index) => (
                        <div key={index} className="bg-red-50 p-3 rounded-lg text-sm text-gray-700">
                            {blocker}
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Recommendations</h3>
                <div className="space-y-2">
                    {feasibility.recommended_adjustments.map((adjustment, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg text-sm text-gray-700">
                            {adjustment}
                        </div>
                    ))}
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

            {/* Target Revenue Feasibility - Moved to bottom */}
            {tamSamSom.serviceable_obtainable_market?.target_revenue_feasibility && (
                <TargetRevenueFeasibilitySection 
                    feasibility={tamSamSom.serviceable_obtainable_market.target_revenue_feasibility} 
                />
            )}
        </div>
    );
}