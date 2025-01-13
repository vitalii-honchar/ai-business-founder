import { HiInformationCircle } from 'react-icons/hi';

export default function TamSamSomComponent({ tamSamSom }) {
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

    const marketDefinitions = {
        total_addressable_market: "Total Addressable Market (TAM): The total market demand for your product or service if you could reach everyone who might need it.",
        serviceable_available_market: "Serviceable Available Market (SAM): The segment of TAM that you can realistically target with your product or service, considering geographical, regulatory or other constraints.",
        serviceable_obtainable_market: "Serviceable Obtainable Market (SOM): The portion of SAM that you can realistically capture, considering competition and your capabilities."
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            {/* Market Size Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tamSamSom.data.slice(0, 3).map((market) => (
                    <div key={market.type} className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center mb-4">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 
                                ${market.type === 'total_addressable_market' ? 'bg-blue-100 text-blue-600' :
                                    market.type === 'serviceable_available_market' ? 'bg-green-100 text-green-600' :
                                        'bg-purple-100 text-purple-600'}`}>
                                {market.name.split(' ').map(word => word[0]).join('')}
                            </div>
                            <div className="flex items-center">
                                <h3 className="text-lg font-semibold text-gray-800">{market.name}</h3>
                                <div className="group relative ml-2">
                                    <HiInformationCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    <div className="invisible group-hover:visible absolute left-0 z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-900 rounded-md shadow-lg">
                                        {marketDefinitions[market.type]}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Users</p>
                                <p className="text-2xl font-bold text-gray-800">{formatNumber(market.data["Number of users"])}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Market Value</p>
                                <p className="text-2xl font-bold text-gray-800">{formatMoney(market.data["Amount of money"])}</p>
                            </div>

                            {market.data["Price per user"] && (
                                <div>
                                    <p className="text-sm text-gray-500">Price per User</p>
                                    <p className="text-lg font-semibold text-gray-800">{formatMoney(market.data["Price per user"])}</p>
                                </div>
                            )}

                            {market.data["Main restrictions"] && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                    <p className="text-sm text-gray-600">{market.data["Main restrictions"]}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Conversion Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Conversion Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tamSamSom.data.slice(3).map((metric) => (
                        <div key={metric.type} className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">{metric.name}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Users</p>
                                    <p className="text-xl font-bold text-gray-800">{formatNumber(metric.data["Number of users"])}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Revenue Potential</p>
                                    <p className="text-xl font-bold text-gray-800">{formatMoney(metric.data["Amount of money"])}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Conversion Rate</p>
                                    <p className="text-xl font-bold text-gray-800">{(metric.data["Conversion rate"] * 100).toFixed(1)}%</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}