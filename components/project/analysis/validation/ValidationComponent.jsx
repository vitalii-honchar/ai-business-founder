import { useEffect, useRef, useState } from 'react';
import HwwComponent from '@/components/project/analysis/validation/HwwComponent'
import ValidationUserInputComponent from '@/components/project/analysis/validation/ValidationUserInputComponent'
import TamSamSomComponent from '@/components/project/analysis/validation/TamSamSomComponent'
import CompetitorAnalysisComponent from '@/components/project/analysis/validation/CompetitorAnalysisComponent';
import eventEmitter, { eventItemVisible } from '@/lib/client/eventEmitter';

const userInputId = 'user-input';
const hwwId = 'hww';
const tamSamSomId = 'tam-sam-som';
const validationId = 'validation';
const competitorAnalysisId = 'competitor-analysis';

export default function ValidationComponent({ project, loading, onSubmit, activeItemId }) {
    const userInputRef = useRef(null);
    const hwwRef = useRef(null);
    const tamSamSomRef = useRef(null);
    const competitorAnalysisRef = useRef(null);
    const [isManualNavigation, setIsManualNavigation] = useState(false);

    useEffect(() => {
        if (!activeItemId) return;

        setIsManualNavigation(true);

        if (activeItemId === userInputId) {
            userInputRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (activeItemId === hwwId) {
            hwwRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (activeItemId === tamSamSomId) {
            tamSamSomRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (activeItemId === competitorAnalysisId) {
            competitorAnalysisRef.current?.scrollIntoView({ behavior: 'smooth' });
        }

        // Reset flag after scroll animation completes
        const timer = setTimeout(() => {
            setIsManualNavigation(false);
        }, 1000); // Adjust timing based on scroll animation duration

        return () => clearTimeout(timer);
    }, [activeItemId]);

    useEffect(() => {
        const options = {
            threshold: 0.3
        };

        const handleIntersection = (entries) => {
            if (isManualNavigation) return; // Skip if manual navigation

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const item = {
                        itemId: validationId,
                        subItemId: null,
                    }

                    if (entry.target === userInputRef.current) {
                        item.subItemId = userInputId;
                    } else if (entry.target === hwwRef.current) {
                        item.subItemId = hwwId;
                    } else if (entry.target === tamSamSomRef.current) {
                        item.subItemId = tamSamSomId;
                    } else if (entry.target === competitorAnalysisRef.current) {
                        item.subItemId = competitorAnalysisId;
                    }

                    eventEmitter.emit(eventItemVisible, item);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (userInputRef.current) observer.observe(userInputRef.current);
        if (hwwRef.current) observer.observe(hwwRef.current);
        if (tamSamSomRef.current) observer.observe(tamSamSomRef.current);

        return () => observer.disconnect();
    }, [isManualNavigation]); // Add dependency

    return (
        <>
            {/* Validation Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-6" ref={userInputRef}>
                <h2 className="text-xl font-bold mb-4">✅ Idea Validation</h2>
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
                    <h2 className="text-xl font-bold mb-4">🤔 HWWW</h2>
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
                    <h2 className="text-xl font-bold mb-4">📊 TAM-SAM-SOM</h2>
                    {loading ? (
                        <div className="h-32 bg-gray-200 rounded"></div>
                    ) : project?.data?.analysis?.validation?.tamSamSom ? (
                        <TamSamSomComponent tamSamSom={project.data.analysis.validation.tamSamSom} />
                    ) : (
                        <p className="text-gray-500">Not analyzed yet</p>
                    )}
                </div>
                <div ref={competitorAnalysisRef} className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                    <h2 className="text-xl font-bold mb-4">🎯 Competitor Analysis</h2>
                    {loading ? (
                        <div className="h-32 bg-gray-200 rounded"></div>
                    ) : project?.data?.analysis?.validation?.competitorAnalysis ? (
                        <CompetitorAnalysisComponent competitorAnalysis={project.data.analysis.validation.competitorAnalysis} />
                    ) : (
                        <p className="text-gray-500">Not analyzed yet</p>
                    )}
                </div>
            </div>
        </>
    );
}