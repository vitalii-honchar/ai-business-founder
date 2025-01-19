import { useEffect, useRef, useState } from 'react';
import { useScroll, useScrolling } from 'react-use';
import HwwComponent from '@/components/project/analysis/validation/HwwComponent'
import ValidationUserInputComponent from '@/components/project/analysis/validation/ValidationUserInputComponent'
import TamSamSomComponent from '@/components/project/analysis/validation/TamSamSomComponent'
import CompetitorAnalysisComponent from '@/components/project/analysis/validation/CompetitorAnalysisComponent';
import SummaryComponent from '@/components/project/analysis/validation/SummaryComponent';
import eventEmitter, { eventItemVisible } from '@/lib/client/eventEmitter';

const userInputId = 'user-input';
const hwwId = 'hww';
const tamSamSomId = 'tam-sam-som';
const validationId = 'validation';
const competitorAnalysisId = 'competitor-analysis';
const summaryId = 'summary';

export default function ValidationComponent({ project, loading, onSubmit, activeItemId }) {
    const userInputRef = useRef(null);
    const hwwRef = useRef(null);
    const tamSamSomRef = useRef(null);
    const competitorAnalysisRef = useRef(null);
    const summaryRef = useRef(null);
    const [isManualNavigation, setIsManualNavigation] = useState(false);

    // Add useScroll hooks for all refs
    useScroll(userInputRef);
    useScroll(hwwRef);
    useScroll(tamSamSomRef);
    useScroll(competitorAnalysisRef);
    useScroll(summaryRef);

    // Add useScrolling hooks for all refs
    useScrolling(userInputRef);
    useScrolling(hwwRef);
    useScrolling(tamSamSomRef);
    useScrolling(competitorAnalysisRef);
    useScrolling(summaryRef);

    useEffect(() => {
        if (!activeItemId) return;

        setIsManualNavigation(true);

        const refs = {
            [userInputId]: userInputRef,
            [hwwId]: hwwRef,
            [tamSamSomId]: tamSamSomRef,
            [competitorAnalysisId]: competitorAnalysisRef,
            [summaryId]: summaryRef
        };

        refs[activeItemId]?.current?.scrollIntoView({ behavior: 'smooth' });

        const timer = setTimeout(() => {
            setIsManualNavigation(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [activeItemId]);

    useEffect(() => {
        const options = {
            threshold: 0.3,
            root: null,
            rootMargin: '0px'
        };

        const handleIntersection = (entries) => {
            if (isManualNavigation) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const refToId = new Map([
                        [userInputRef.current, userInputId],
                        [hwwRef.current, hwwId],
                        [tamSamSomRef.current, tamSamSomId],
                        [competitorAnalysisRef.current, competitorAnalysisId],
                        [summaryRef.current, summaryId]
                    ]);

                    const item = {
                        itemId: validationId,
                        subItemId: refToId.get(entry.target)
                    };

                    eventEmitter.emit(eventItemVisible, item);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        [userInputRef, hwwRef, tamSamSomRef, competitorAnalysisRef, summaryRef]
            .forEach(ref => ref.current && observer.observe(ref.current));

        return () => observer.disconnect();
    }, [isManualNavigation]);

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
            <div className="space-y-6">
                {/* HWW Analysis */}
                <div ref={hwwRef} className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
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
                <div ref={summaryRef} className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                    <h2 className="text-xl font-bold mb-4">📋 Summary</h2>
                    {loading ? (
                        <div className="h-32 bg-gray-200 rounded"></div>
                    ) : project?.data?.analysis?.validation?.summary ? (
                        <SummaryComponent summary={project.data.analysis.validation.summary} />
                    ) : (
                        <p className="text-gray-500">Not analyzed yet</p>
                    )}
                </div>
            </div>
        </>
    );
}