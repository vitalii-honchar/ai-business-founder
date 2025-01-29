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
    personalConstraints: "",
}

const placeholders = {
    problem: "Think like a founder! Example: 'Small business owners waste 10+ hours weekly on manual bookkeeping, leading to cash flow issues and tax compliance problems. Current solutions are either too complex or too expensive for businesses making under $1M/year.'",
    personalConstraints: "Be strategic about your resources! Example: 'First-time founder with MBA, currently employed as Product Manager. Can invest $10k savings and 20h/week. Strong in product and strategy, need technical co-founder. Have network in fintech industry.'",
    auditory: "Define your ideal customer profile! Example: 'Small business owners and freelancers, $200k-$1M annual revenue, primarily in service industries, tech-savvy but not technical, willing to pay $50-100/month for automation.'",
    industry: "What's your market sector? Example: 'B2B SaaS', 'Direct-to-Consumer E-commerce', 'Enterprise Software', 'Marketing Technology', 'Financial Services'",
    location: "Define your go-to-market region. Example: 'Starting with NYC & SF tech hubs, expanding to top 10 US startup ecosystems', 'Major European business centers', 'English-speaking markets globally'",
    language: "Business communication languages. Example: 'English primary, support docs in Spanish & French', 'English + Mandarin for Asian market expansion', 'German - focusing on DACH region'",
    platform: "Delivery strategy. Example: 'Cloud-based SaaS with admin dashboard', 'Mobile-first platform with web portal', 'API-first service with white-label options'",
    currency: "Revenue currencies. Example: 'USD primary + major European currencies', 'USD globally with local payment options', 'Multi-currency: focusing on USD, EUR, GBP for enterprise clients'"
}

const orderedFields = [
    'problem',
    'personalConstraints',
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
        <form className="w-full max-w-7xl mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
                {/* Problem field - full width */}
                <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                        problem <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                        <textarea
                            name="problem"
                            value={formData.problem || ''}
                            onChange={(e) => handleInputChange('problem', e.target.value)}
                            rows={6}
                            className={`w-full rounded-md border ${
                                errors.problem ? 'border-red-500' : 'border-gray-300'
                            } shadow-sm p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                            placeholder={placeholders.problem}
                            disabled={loading}
                        />
                    </div>
                    {errors.problem && (
                        <p className="mt-1 text-sm text-red-500">{errors.problem}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">{placeholders.problem}</p>
                </div>

                {/* Other fields - 2 columns grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {orderedFields.slice(1).map(key => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()} <span className="text-red-500">*</span>
                            </label>
                            {key === 'auditory' || key === 'personalConstraints' ? (
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
            </div>

            <div className="col-span-full mt-4 flex justify-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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