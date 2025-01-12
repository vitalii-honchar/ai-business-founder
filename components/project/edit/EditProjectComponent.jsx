'use client'

import { useState } from 'react'

export default function EditProjectComponent({ project }) {
    const [formData, setFormData] = useState({
        problem: "Many small and medium-sized businesses (SMBs) struggle to track and reduce their carbon footprint due to a lack of affordable, user-friendly tools. This prevents them from complying with environmental regulations and meeting consumer expectations for sustainable practices.",
        industry: "Small and medium-sized businesses in retail, manufacturing, and logistics.",
        location: "North America and Europe",
        language: "English",
        platform: "Web and mobile applications",
        currency: "USD",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="flex h-screen">
            {/* Left Panel - Input Form */}
            <div className="w-1/2 p-6 bg-gray-50 overflow-y-auto">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Problem</label>
                        <textarea
                            name="problem"
                            value={formData.problem}
                            onChange={handleInputChange}
                            rows={4}
                            className="mt-1 w-full rounded-md border border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    {['industry', 'location', 'language', 'platform', 'currency'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 capitalize">
                                {field}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm p-2"
                            />
                        </div>
                    ))}
                </form>
            </div>

            {/* Right Panel - Preview */}
            <div className="w-1/2 p-6 bg-white overflow-y-auto border-l">
                <div className="space-y-8">
                    {/* Validation Section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Validation</h2>
                        
                        {/* HWW Subsection */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">HWW</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {/* HWW content will go here */}
                            </div>
                        </div>

                        {/* TAM-SAM-SOM Subsection */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">TAM-SAM-SOM</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {/* TAM-SAM-SOM content will go here */}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}