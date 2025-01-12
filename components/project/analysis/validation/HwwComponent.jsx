export default async function HwwComponent({ hww }) {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Problem Size Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Problem Size</h2>
        <p className="text-gray-600 mb-2">{hww.problem_size.description}</p>
        <p className="text-gray-700 font-medium">{hww.problem_size.data}</p>
      </section>

      {/* Root Cause Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Root Cause</h2>
        <p className="text-gray-700">{hww.root_cause}</p>
      </section>

      {/* Challenges Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Challenges</h2>
        <p className="text-gray-600 mb-6">{hww.challenges.description}</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Base</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hww.challenges.competitors.map((competitor, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{competitor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{competitor.user_base}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{competitor.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Demographics Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Target Demographics</h2>
        <p className="text-gray-700">{hww.affected_demographics}</p>
      </section>
    </div>
  );
}