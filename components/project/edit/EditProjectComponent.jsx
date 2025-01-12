'use client'

import { useState } from 'react'
import projecApi from '@/lib/client/api/project_api'
import HwwComponent from '@/components/project/analysis/validation/HwwComponent'
import ValidationUserInputComponent from '@/components/project/analysis/validation/ValidationUserInputComponent'

export default function EditProjectComponent({ project: initialProject }) {
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState(initialProject)
    const [error, setError] = useState(null)

    const withLoading = (fn) => {
        return (...args) => {
            setLoading(true)
            setError(null)

            fn(...args)
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => setLoading(false));
        }
    }

    const handleValidationSubmit = withLoading((formData) => {
        return projecApi.generateProjectValidation(project.id, formData)
            .then(newProject => setProject(newProject));
    })

    return (
        <div className="flex h-screen">
            <div className="w-1/2 p-6 bg-gray-50 overflow-y-auto">
                <ValidationUserInputComponent
                    onSubmit={handleValidationSubmit}
                    loading={loading}
                    initialFormData={project?.data?.input?.validation || null}
                />
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