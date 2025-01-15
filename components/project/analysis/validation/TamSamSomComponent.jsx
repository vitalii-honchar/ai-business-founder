import { HiInformationCircle, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useState } from 'react';

const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(num);
};

const formatMoney = (num) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(num);
};

const MarketCard = ({ title, data, color, definition }) => (
    <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 border-${color}-500`}>
        <div className="flex items-center mb-4">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 bg-${color}-100 text-${color}-600`}>
                {title.split(' ').map(word => word[0]).join('')}
            </div>
            <div className="flex items-center">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <div className="group relative ml-2">
                    <HiInformationCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    <div className="invisible group-hover:visible absolute left-0 z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-900 rounded-md shadow-lg">
                        {definition}
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <div>
                <p className="text-sm text-gray-500">Users</p>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(data.number_of_users)}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Revenue Potential</p>
                <p className="text-2xl font-bold text-gray-800">{formatMoney(data.amount_of_money)}</p>
            </div>
            {data.price_per_user && (<div>
                <p className="text-sm text-gray-500">Price per User</p>
                <p className="text-lg font-semibold text-gray-800">{formatMoney(data.price_per_user)}</p>
            </div>)}
            {data.main_restrictions && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">{data.main_restrictions}</p>
                </div>
            )}
        </div>
    </div>
);

const MarketLandscape = ({ data }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8 transition-all hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Market Landscape</h2>
                <div className="text-sm text-gray-500">
                    {data.updated_at && `Last updated: ${new Date(data.updated_at).toLocaleDateString()}`}
                </div>
            </div>

            <div className="mt-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Demographics Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <span>Demographics</span>
                            <span className="ml-2 text-sm text-gray-500">{data.demographics?.length} segments</span>
                        </h3>
                        <div className="space-y-3">
                            {data.demographics?.map((item, index) => (
                                <div key={index} 
                                     className="flex justify-between py-2 px-3 hover:bg-white rounded transition-colors">
                                    <span className="text-gray-600">{item.name}</span>
                                    <span className="font-medium">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Size Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

export default function TamSamSomComponent({ tamSamSom }) {
    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <MarketCard
                    title={"Market Ready to Pay"}
                    data={tamSamSom.market_ready_to_pay}
                    color={'green'}
                    definition={"Users showing clear purchase intent"}
                />
                <MarketCard
                    title={"Paid Users"}
                    data={tamSamSom.paid_users}
                    color={'green'}
                    definition={"Paid Users"}
                />
            </div>
            <MarketLandscape data={tamSamSom.market_landscape} />
        </div>
    );
}