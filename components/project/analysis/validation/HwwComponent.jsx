export default function HwwComponent({ hww }) {
    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            <section className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How big a problem is this?</h2>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-blue-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Overview</h3>
                        <p className="text-gray-600">{hww.problem_size.description}</p>
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Impact</h3>
                        <p className="text-gray-700">{hww.problem_size.data}</p>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Why does this problem exist?</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-gray-700">{hww.root_cause}</p>
                </div>
            </section>

            {/* Market Challenges & Competitors */}
            <section className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Why is nobody solving it?</h2>
                <div className="bg-red-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700">{hww.challenges.description}</p>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Competitors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hww.challenges.competitors.map((competitor, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center mb-3">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                    <span className="text-indigo-600 font-semibold">{index + 1}</span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800">{competitor.name}</h4>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-600">{competitor.revenue}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="text-gray-600">{competitor.user_base}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Target Demographics */}
            <section className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Who faces this problem?</h2>
                <div className="bg-green-50 rounded-lg p-6">
                    <p className="mt-4 text-gray-700">{hww.affected_demographics}</p>
                </div>
            </section>
        </div>
    );
}