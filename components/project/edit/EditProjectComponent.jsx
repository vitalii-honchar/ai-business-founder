'use client'

import { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import projecApi from '@/lib/client/api/project_api'
import ValidationComponent from '@/components/project/analysis/validation/ValidationComponent'
import UserResearchComponent from '@/components/project/analysis/user_research/UserResearchComponent'
import CustomerJourneyMapComponent from '@/components/project/analysis/customer_journey_map/CustomerJourneyMapComponent'
import NavigationPanel from '@/components/project/edit/NavigationPanel'

export default function EditProjectComponent({ project: initialProject }) {
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState(initialProject)
    const [name, setName] = useState(initialProject.name)
    const [error, setError] = useState(null)
    const [nameLoading, setNameLoading] = useState(false)
    const [activeStep, setActiveStep] = useState('Validation')

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
            {/* Header with name */}
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

            {/* Content with fixed navigation */}
            <div className="flex h-[calc(100vh-88px)]">
                {/* Fixed navigation panel - now on left */}
                <div className="w-80 flex-shrink-0 border-r border-gray-200 bg-white p-6">
                    <NavigationPanel
                        activeStep={activeStep}
                        onStepChange={setActiveStep}
                    />
                </div>

                {/* Main scrollable content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {activeStep === 'Validation' && (
                        <ValidationComponent
                            project={project}
                            onSubmit={handleValidationSubmit}
                            loading={loading}
                        />
                    )}
                    {activeStep === 'User Research' && (
                        <UserResearchComponent
                            project={project}
                        />
                    )}
                    {activeStep === 'Customer Journey Map' && (
                        <CustomerJourneyMapComponent
                            project={project}
                        />
                    )}
                    {/* Add more step components */}
                </div>
            </div>
        </div>
    );
}
