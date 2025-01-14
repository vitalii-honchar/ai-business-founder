function HwwComponent({ hww }) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Problem Size Section */}
            <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">How big is this problem?</h2>

                {/* Overview Card */}
                <div className="bg-blue-50 rounded-lg p-5 mb-6">
                    <p className="text-gray-700">{hww.how_big_a_problem_is.overview.description}</p>
                    <div className="mt-4 flex items-center space-x-2 text-blue-600">
                        <span className="text-2xl font-bold">{hww.how_big_a_problem_is.overview.size}</span>
                        <span className="text-sm uppercase">{hww.how_big_a_problem_is.overview.dimension}</span>
                    </div>
                </div>

                {/* Frequency Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {hww.how_big_a_problem_is.frequency.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700 mb-2">{item.name}</h3>
                            <p className="text-gray-600 text-sm">{item.explanation}</p>
                        </div>
                    ))}
                </div>

                {/* Readiness to Pay */}
                <div className="bg-green-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-800 mb-3">Readiness to Pay</h3>
                    <p className="text-gray-700 mb-4">{hww.how_big_a_problem_is.readiness_to_pay.summary}</p>
                    <div className="text-green-600 font-bold text-xl mb-4">
                        ${hww.how_big_a_problem_is.readiness_to_pay.pricing}
                    </div>
                    <div className="space-y-2">
                        {hww.how_big_a_problem_is.readiness_to_pay.researches.map((research, index) => (
                            <div key={index} className="bg-white rounded p-3 text-sm">
                                <span className="font-medium">{research.research}</span>
                                <p className="text-gray-600 mt-1">{research.explanation}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Does This Problem Exist Section */}
            <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Why does this problem exist?</h2>
                <p className="text-gray-700 mb-6">{hww.why_does_this_problem_exist.summary}</p>
                <div className="grid md:grid-cols-2 gap-4">
                    {hww.why_does_this_problem_exist.reasons.map((reason, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700 mb-2">{reason.name}</h3>
                            <p className="text-gray-600 text-sm">{reason.explanation}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Nobody Solving It Section */}
            <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Why is nobody solving it?</h2>
                <p className="text-gray-700 mb-6">{hww.why_nobody_solving_it.summary}</p>
                <div className="grid md:grid-cols-2 gap-4">
                    {hww.why_nobody_solving_it.reasons.map((reason, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700 mb-2">{reason.name}</h3>
                            <p className="text-gray-600 text-sm">{reason.explanation}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Who Faces This Problem Section */}
            <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Who faces this problem?</h2>
                <p className="text-gray-700 mb-6">{hww.who_faces_this_problem.summary}</p>
                
                <div className="space-y-6">
                    {/* Characteristics */}
                    <MetricsSection 
                        title="Characteristics" 
                        items={hww.who_faces_this_problem.metrics.characteristics} 
                    />

                    {/* Geography */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Geography</h3>
                        <div className="flex flex-wrap gap-2">
                            {hww.who_faces_this_problem.metrics.geography.map((item, index) => (
                                <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-gray-600">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Other Metrics Sections */}
                    <MetricsSection 
                        title="Psychology Patterns" 
                        items={hww.who_faces_this_problem.metrics.psychology_patterns} 
                    />
                    <MetricsSection 
                        title="Habitual Behaviour" 
                        items={hww.who_faces_this_problem.metrics.habitual_behaviour} 
                    />
                    <MetricsSection 
                        title="Trust Issues" 
                        items={hww.who_faces_this_problem.metrics.trust_issues} 
                    />
                    <MetricsSection 
                        title="Where to Find Them" 
                        items={hww.who_faces_this_problem.metrics.where_to_find_them} 
                    />
                </div>
            </section>
        </div>
    );
}

function MetricsSection({ title, items }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="bg-white rounded p-3 flex justify-between items-center">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="text-gray-600 font-medium">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HwwComponent;