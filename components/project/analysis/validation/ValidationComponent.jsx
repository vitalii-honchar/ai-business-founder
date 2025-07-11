import { useRef, useEffect } from 'react';
import NavigationButtons from '@/components/common/NavigationButtons';
import HwwComponent from '@/components/project/analysis/validation/HwwComponent'
import ValidationUserInputComponent from '@/components/project/analysis/validation/ValidationUserInputComponent'
import TamSamSomComponent from '@/components/project/analysis/validation/TamSamSomComponent'
import CompetitorAnalysisComponent from '@/components/project/analysis/validation/CompetitorAnalysisComponent';
import ComponentCard from '@/components/project/analysis/ComponentCard';
import SummaryComponent from '@/components/project/analysis/validation/SummaryComponent';
import eventEmitter, { eventItemVisible } from '@/lib/client/eventEmitter';
import { getUserId } from '@/lib/db/dbClient';
import OptimizationsComponent from '@/components/project/analysis/validation/OptimizationsComponent';

const sections = [
    { id: 'user-input', label: 'User Input', icon: '👤' },
    { id: 'hww', label: 'Problem Research', icon: '🤔' },
    { id: 'tam-sam-som', label: 'Market Size', icon: '📊' },
    { id: 'competitor-analysis', label: 'Competitor Analysis', icon: '🎯' },
    { id: 'summary', label: 'Summary', icon: '📋' },
    { id: 'optimizations', label: 'Optimizations', icon: '✨' }
];

const isTaskPending = (project, taskName) => {
    return project?.data?.tasks?.validation?.includes(taskName) ?? false;
};

export default function ValidationComponent({ project, loading, onSubmit, activeItemId, readOnly, reachedValidationLimit, userProfileLimits }) {
    const contentRef = useRef(null);
    const currentSectionIndex = sections.findIndex(section => section.id === activeItemId);

    useEffect(() => {
        if (contentRef.current) {
            setTimeout(() => {
                contentRef.current.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [activeItemId]);

    const scrollToTop = () => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handlePrevious = () => {
        if (currentSectionIndex > 0) {
            eventEmitter.emit(eventItemVisible, {
                itemId: 'validation',
                subItemId: sections[currentSectionIndex - 1].id
            });
            scrollToTop();
        }
    };

    const handleNext = () => {
        if (currentSectionIndex < sections.length - 1) {
            eventEmitter.emit(eventItemVisible, {
                itemId: 'validation',
                subItemId: sections[currentSectionIndex + 1].id
            });
            scrollToTop();
        }
    };

    const renderLoadingState = (message) => (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="animate-spin h-8 w-8 text-blue-500 mb-4">⏳</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis in Progress</h3>
            <p className="text-gray-500">{message}</p>
            <p className="text-sm text-gray-400 mt-2">This might take a few minutes...</p>
        </div>
    );

    const renderContent = () => {
        const currentSection = sections.find(section => section.id === activeItemId);
        const tasks = {
            hww: 'analyze_hww',
            'tam-sam-som': 'analyze_tam_sam_som',
            'competitor-analysis': 'analyze_competitors',
            'summary': 'generate_summary',
            'generateOptimizations': 'generate_optimizations'
        };
        switch (activeItemId) {
            case 'user-input':
                return (
                    <ComponentCard title="User Input" icon={currentSection.icon}>
                        <ValidationUserInputComponent
                            onSubmit={onSubmit}
                            loading={loading}
                            initialFormData={project?.data?.input?.validation || null}
                            readOnly={readOnly}
                            reachedValidationLimit={reachedValidationLimit}
                            userProfileLimits={userProfileLimits}
                        />
                    </ComponentCard>
                );
            case 'hww':
                return (
                    <ComponentCard
                        title="Problem Research"
                        icon={currentSection.icon}
                        loading={isTaskPending(project, tasks.hww)}
                    >
                        {isTaskPending(project, tasks.hww) ? (
                            renderLoadingState("We're analyzing your business idea using the How-Why-What framework...")
                        ) : project?.data?.analysis?.validation?.hww ? (
                            <HwwComponent hww={project.data.analysis.validation.hww} />
                        ) : null}
                    </ComponentCard>
                );
            case 'tam-sam-som':
                return (
                    <ComponentCard
                        title="Market Size"
                        icon={currentSection.icon}
                        loading={isTaskPending(project, tasks['tam-sam-som'])}
                    >
                        {isTaskPending(project, tasks['tam-sam-som']) ? (
                            renderLoadingState("We're analyzing the Total Addressable Market, Serviceable Available Market, and Serviceable Obtainable Market for your business...")
                        ) : project?.data?.analysis?.validation?.tamSamSom ? (
                            <TamSamSomComponent tamSamSom={project.data.analysis.validation.tamSamSom} userInput={project.data.input.validation} />
                        ) : null}
                    </ComponentCard>
                );
            case 'competitor-analysis':
                return (
                    <ComponentCard
                        title="Competitor Analysis"
                        icon={currentSection.icon}
                        loading={isTaskPending(project, tasks['competitor-analysis'])}
                    >
                        {isTaskPending(project, tasks['competitor-analysis']) ? (
                            renderLoadingState("We're analyzing your competitors to provide you with valuable insights...")
                        ) : project?.data?.analysis?.validation?.competitorAnalysis ? (
                            <CompetitorAnalysisComponent competitorAnalysis={project.data.analysis.validation.competitorAnalysis} />
                        ) : null}
                    </ComponentCard>
                );
            case 'summary':
                return (
                    <ComponentCard
                        title="Summary"
                        icon={currentSection.icon}
                        loading={isTaskPending(project, tasks.summary)}
                    >
                        {isTaskPending(project, tasks.summary) ? (
                            renderLoadingState("We're generating a summary of your analysis results...")
                        ) : project?.data?.analysis?.validation?.summary ? (
                            <SummaryComponent 
                                summary={project.data.analysis.validation.summary} 
                                userInput={project.data.input.validation}
                                tamSamSom={project.data.analysis.validation.tamSamSom}
                                readOnly={readOnly}
                            />
                        ) : null}
                    </ComponentCard>
                );
            case 'optimizations':
                return (
                    <ComponentCard
                        title="Optimized Variations"
                        icon={currentSection.icon}
                        loading={isTaskPending(project, tasks.generateOptimizations)}
                    >
                        {isTaskPending(project, tasks.generateOptimizations) ? (
                            renderLoadingState("We're generating optimized variations of your business idea...")
                        ) : project?.data?.analysis?.validation?.optimizations ? (
                            <OptimizationsComponent 
                                optimizations={project.data.analysis.validation.optimizations.optimized_problems} 
                                readOnly={readOnly}
                            />
                        ) : null}
                    </ComponentCard>
                );
            default:
                return null;
        }
    };

    return (
        <div className="pb-20">
            <div ref={contentRef} className="scroll-mt-4">{renderContent()}</div>
            <NavigationButtons
                onPrevious={handlePrevious}
                onNext={handleNext}
                prevLabel={currentSectionIndex > 0 ? sections[currentSectionIndex - 1].label : ''}
                nextLabel={currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1].label : ''}
                prevIcon={currentSectionIndex > 0 ? sections[currentSectionIndex - 1].icon : null}
                nextIcon={currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1].icon : null}
            />
        </div>
    );
}