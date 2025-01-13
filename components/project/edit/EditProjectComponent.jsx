'use client'

import { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import projecApi from '@/lib/client/api/project_api'
import HwwComponent from '@/components/project/analysis/validation/HwwComponent'
import ValidationUserInputComponent from '@/components/project/analysis/validation/ValidationUserInputComponent'
import TamSamSomComponent from '@/components/project/analysis/validation/TamSamSomComponent'

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

    const debouncedUpdateProjectName = useCallback(
        debounce((newName) => {
            setNameLoading(true)
            return projecApi.updateProjectName(project.id, newName)
                .then((resp) => setName(resp.name))
                .catch((err) => setError(err.message))
                .finally(() => setNameLoading(false));
        }, 1000),
        [project.id]
    )

    const handleNameChange = (e) => {
        const newName = e.target.value
        setName(newName)
        debouncedUpdateProjectName(newName)
    }

    const handleBlur = () => {
        debouncedUpdateProjectName.flush()
    }

    return (
        <div>
            {/* Header with name - Keep this part unchanged */}
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <input
                            type="text"
                            value={name || ''}
                            onChange={handleNameChange}
                            onBlur={handleBlur}
                            className="text-2xl font-semibold leading-6 text-gray-900 sm:text-3xl sm:tracking-tight w-full bg-transparent border-0 focus:ring-0 focus:outline-none"
                            placeholder="Enter project name"
                        />
                        {nameLoading && <span className="text-sm text-gray-500">Saving...</span>}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="w-full px-6 py-6">
                {/* Validation Form */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">Project Validation</h2>
                    <ValidationUserInputComponent
                        onSubmit={handleValidationSubmit}
                        loading={loading}
                        initialFormData={project?.data?.input?.validation || null}
                    />
                </div>

                {/* Analysis Results - Stacked Layout */}
                <div className="space-y-6">
                    {/* HWW Analysis */}
                    <div className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                        <h2 className="text-xl font-bold mb-4">HWWW</h2>
                        {loading ? (
                            <div className="h-32 bg-gray-200 rounded"></div>
                        ) : project?.data?.analysis?.validation?.hww ? (
                            <HwwComponent hww={project.data.analysis.validation.hww} />
                        ) : (
                            <p className="text-gray-500">Not generated yet</p>
                        )}
                    </div>

                    {/* Market Size Analysis */}
                    <div className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                        <h2 className="text-xl font-bold mb-4">TAM-SAM-SOM</h2>
                        {loading ? (
                            <div className="h-32 bg-gray-200 rounded"></div>
                        ) : project?.data?.analysis?.validation?.tamSamSom ? (
                            <TamSamSomComponent tamSamSom={project.data.analysis.validation.tamSamSom} />
                        ) : (
                            <p className="text-gray-500">Not generated yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
