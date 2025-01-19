'use client'

import { useState } from 'react'

const defaultFormData = {
    problem: "",
    industry: "",
    location: "",
    language: "",
    platform: "",
    currency: "",
    auditory: "", // Add new field
}

const placeholders = {
    problem: "Describe the specific problem your business idea solves (e.g., 'Difficulty finding pet sitters on short notice')",
    industry: "Enter the main industry sector (e.g., 'Technology', 'Healthcare', 'Retail')",
    location: "Target market location (e.g., 'Global', 'United States', 'European Union')",
    language: "Primary language for your service/product (e.g., 'English', 'Spanish')",
    platform: "Delivery platform or channel (e.g., 'Mobile App', 'Web Platform', 'Physical Store')",
    currency: "Primary currency for transactions (e.g., 'USD', 'EUR', 'GBP')",
    auditory: "Define your target audience (e.g., 'Small business owners', 'College students', 'Working professionals')"
}

const orderedFields = [
    'problem',
    'auditory',
    'industry',
    'location',
    'language',
    'platform',
    'currency'
];

// Add loading indicator and input validation
export default function ValidationUserInputComponent({ onSubmit, loading, initialFormData }) {
    const [formData, setFormData] = useState(initialFormData || defaultFormData)
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        orderedFields.forEach(key => {
            if (!formData[key]?.trim()) {
                newErrors[key] = `${key} is required`
            }
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(formData)
        }
    }

    const handleInputChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orderedFields.map(key => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                            {key} <span className="text-red-500">*</span>
                        </label>
                        {key === 'problem' || key === 'auditory' ? (
                            <div className="mt-1">
                                <textarea
                                    name={key}
                                    value={formData[key] || ''}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    rows={4}
                                    className={`w-full rounded-md border ${
                                        errors[key] ? 'border-red-500' : 'border-gray-300'
                                    } shadow-sm p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                                    placeholder={placeholders[key]}
                                    disabled={loading}
                                />
                            </div>
                        ) : (
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key] || ''}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    className={`w-full rounded-md border ${
                                        errors[key] ? 'border-red-500' : 'border-gray-300'
                                    } shadow-sm p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                                    placeholder={placeholders[key]}
                                    disabled={loading}
                                />
                            </div>
                        )}
                        {errors[key] && (
                            <p className="mt-1 text-sm text-red-500">{errors[key]}</p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">{placeholders[key]}</p>
                    </div>
                ))}
            </div>

            <div className="col-span-full">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Validating...
                        </>
                    ) : (
                        '🚀 Validate!'
                    )}
                </button>
            </div>
        </form>
    )
}