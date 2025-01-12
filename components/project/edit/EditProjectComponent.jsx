'use client'

import { useState } from 'react'

export default function EditProjectComponent({ project }) {
    console.log('Project:', project)

    const [formData, setFormData] = useState({
        problem: "Many small and medium-sized businesses (SMBs) struggle to track and reduce their carbon footprint due to a lack of affordable, user-friendly tools. This prevents them from complying with environmental regulations and meeting consumer expectations for sustainable practices.",
        industry: "Small and medium-sized businesses in retail, manufacturing, and logistics.",
        location: "North America and Europe",
        language: "English",
        platform: "Web and mobile applications",
        currency: "USD",
    })
    const [loading, setLoading] = useState(false)
    const [validationResults, setValidationResults] = useState(null)
    const [error, setError] = useState(null)

    const generateValidation = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/project/${project.id}/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'validation',
                    data: formData
                }),
            })

            const data = await response.json()
            console.log('Validation response:', data)
            if (!data.success) throw new Error(data.error)

            setValidationResults(data.content)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen">
            {/* Left Panel */}
            <div className="w-1/2 p-6 bg-gray-50 overflow-y-auto">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 capitalize">
                                {key}
                            </label>
                            {key === 'problem' ? (
                                <textarea
                                    name={key}
                                    value={value}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        [key]: e.target.value
                                    }))}
                                    rows={4}
                                    className="mt-1 w-full rounded-md border border-gray-300 shadow-sm p-2"
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        [key]: e.target.value
                                    }))}
                                    className="mt-1 w-full rounded-md border border-gray-300 shadow-sm p-2"
                                />
                            )}
                        </div>
                    ))}

                    <button
                        onClick={generateValidation}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {loading ? 'Generating Validation...' : 'Generate Validation'}
                    </button>
                </form>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 p-6 bg-white overflow-y-auto border-l">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Validation</h2>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">HWW</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {loading ? (
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-4 py-1">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                ) : (
                                    validationResults?.hww || 'Generate validation to see analysis'
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">TAM-SAM-SOM</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {loading ? (
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-4 py-1">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                ) : (
                                    validationResults?.tamSamSom || 'Generate validation to see analysis'
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}