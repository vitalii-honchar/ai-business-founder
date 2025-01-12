'use client'

import { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import projecApi from '@/lib/client/api/project_api'
import HwwComponent from '@/components/project/analysis/validation/HwwComponent'
import ValidationUserInputComponent from '@/components/project/analysis/validation/ValidationUserInputComponent'

export default function EditProjectComponent({ project: initialProject }) {
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState(initialProject)
    const [name, setName] = useState(initialProject.name)
    const [error, setError] = useState(null)
    const [nameLoading, setNameLoading] = useState(false)

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

    const updateProjectName = useCallback(
        debounce((newName) => {
            setNameLoading(true)
            return projecApi.updateProjectName(project.id, newName)
                .then((resp) => setName(resp.name))
                .catch((err) => setError(err.message))
                .finally(() => setNameLoading(false));
        }, 500),
        [project.id]
    )

    return (
        <div>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <input
                            type="text"
                            value={name || ''}
                            onChange={(e) => updateProjectName(e.target.value)}
                            className="text-2xl font-semibold leading-6 text-gray-900 sm:text-3xl sm:tracking-tight w-full bg-transparent border-0 focus:ring-0 focus:outline-none"
                            placeholder="Enter project name"
                        />
                        {nameLoading && <span className="text-sm text-gray-500">Saving...</span>}
                    </div>
                </div>
            </div>
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
        </div>
    )
}