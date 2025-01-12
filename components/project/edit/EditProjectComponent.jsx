'use client'

import { useState } from 'react'
import projecApi from '@/lib/client/api/project_api';
import HwwComponent from '@/components/project/analysis/validation/HwwComponent';

export default function EditProjectComponent({ project: initialProject }) {
    console.log('Project:', initialProject)
    const [formData, setFormData] = useState({
        problem: "Many small and medium-sized businesses (SMBs) struggle to track and reduce their carbon footprint due to a lack of affordable, user-friendly tools. This prevents them from complying with environmental regulations and meeting consumer expectations for sustainable practices.",
        industry: "Small and medium-sized businesses in retail, manufacturing, and logistics.",
        location: "North America and Europe",
        language: "English",
        platform: "Web and mobile applications",
        currency: "USD",
    })
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState(initialProject)
    const [error, setError] = useState(null)

    const withLoading = (fn) => {
        return async () => {
            setLoading(true)
            setError(null)

            try {
                await fn();
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        };
    };

    const generateValidation = withLoading(async () => {
        const newProject = await projecApi.generateProjectValidation(project.id, formData);
        setProject(newProject);
    });

    return (
        <div className="flex h-screen">
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
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Generate Validation'}
                    </button>
                </form>
            </div>

            <div className="w-1/2 p-6 overflow-y-auto">
                <div className="space-y-6">
                    <div className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                        <h2 className="text-xl font-bold mb-4">How/What/Why Analysis</h2>
                        {loading ? (
                            <div className="h-32 bg-gray-200 rounded"></div>
                        ) : project?.data?.analysis?.validation?.hww ? (
                            <HwwComponent hww={project.data.analysis.validation.hww} />
                        ) : (
                            <p className="text-gray-500">Not generated yet</p>
                        )}
                    </div>

                    <div className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                        <h2 className="text-xl font-bold mb-4">Market Size Analysis</h2>
                        {loading ? (
                            <div className="h-32 bg-gray-200 rounded"></div>
                        ) : project?.data?.analysis?.validation?.tamSamSom ? (
                            <pre className="whitespace-pre-wrap">
                                {JSON.stringify(project.data.analysis.validation.tamSamSom, null, 2)}
                            </pre>
                        ) : (
                            <p className="text-gray-500">Not generated yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}