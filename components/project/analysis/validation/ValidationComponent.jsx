import { useEffect, useRef } from 'react';
import HwwComponent from '@/components/project/analysis/validation/HwwComponent'
import ValidationUserInputComponent from '@/components/project/analysis/validation/ValidationUserInputComponent'
import TamSamSomComponent from '@/components/project/analysis/validation/TamSamSomComponent'

export default function ValidationComponent({ project, loading, onSubmit, activeItemId }) {
    const userInputRef = useRef(null);
    const hwwRef = useRef(null);
    const tamSamSomRef = useRef(null);

    useEffect(() => {
        if (activeItemId === 'user-input') {
            userInputRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (activeItemId === 'hww') {
            hwwRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (activeItemId === 'tam-sam-som') {
            tamSamSomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeItemId]);

    return (
        <>
            {/* Validation Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-6" ref={userInputRef}>
                <h2 className="text-xl font-bold mb-4">Idea Validation</h2>
                <ValidationUserInputComponent
                    onSubmit={onSubmit}
                    loading={loading}
                    initialFormData={project?.data?.input?.validation || null}
                />
            </div>

            {/* Analysis Results - Stacked Layout */}
            <div className="space-y-6" ref={hwwRef}>
                {/* HWW Analysis */}
                <div className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                    <h2 className="text-xl font-bold mb-4">HWWW</h2>
                    {loading ? (
                        <div className="h-32 bg-gray-200 rounded"></div>
                    ) : project?.data?.analysis?.validation?.hww ? (
                        <HwwComponent hww={project.data.analysis.validation.hww} />
                    ) : (
                        <p className="text-gray-500">Not analyzed yet</p>
                    )}
                </div>

                {/* Market Size Analysis */}
                <div ref={tamSamSomRef} className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                    <h2 className="text-xl font-bold mb-4">TAM-SAM-SOM</h2>
                    {loading ? (
                        <div className="h-32 bg-gray-200 rounded"></div>
                    ) : project?.data?.analysis?.validation?.tamSamSom ? (
                        <TamSamSomComponent tamSamSom={project.data.analysis.validation.tamSamSom} />
                    ) : (
                        <p className="text-gray-500">Not analyzed yet</p>
                    )}
                </div>
            </div>
        </>
    );
}