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

export default function ValidationUserInputComponent({ onSubmit, loading, initialFormData }) {
    const [formData, setFormData] = useState(initialFormData || defaultFormData)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleInputChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {orderedFields.map(key => (
                <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                        {key}
                    </label>
                    {key === 'problem' || key === 'auditory' ? (
                        <textarea
                            name={key}
                            value={formData[key]}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            rows={4}
                            className="mt-1 w-full rounded-md border border-gray-300 shadow-sm p-2"
                            placeholder={placeholders[key]}
                        />
                    ) : (
                        <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 shadow-sm p-2"
                            placeholder={placeholders[key]}
                        />
                    )}
                </div>
            ))}

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Generating...' : 'Generate Validation'}
            </button>
        </form>
    )
}