import NavigationButtons from '@/components/common/NavigationButtons';
import HwwComponent from '@/components/project/analysis/validation/HwwComponent'
import ValidationUserInputComponent from '@/components/project/analysis/validation/ValidationUserInputComponent'
import TamSamSomComponent from '@/components/project/analysis/validation/TamSamSomComponent'
import CompetitorAnalysisComponent from '@/components/project/analysis/validation/CompetitorAnalysisComponent';
import ComponentCard from '@/components/project/analysis/ComponentCard';
import SummaryComponent from '@/components/project/analysis/validation/SummaryComponent';
import eventEmitter, { eventItemVisible } from '@/lib/client/eventEmitter';

const sections = [
    { id: 'user-input', label: 'User Input', icon: '✅' },
    { id: 'hww', label: 'HWW', icon: '🤔' },
    { id: 'tam-sam-som', label: 'TAM-SAM-SOM', icon: '📊' },
    { id: 'competitor-analysis', label: 'Competitor Analysis', icon: '🎯' },
    { id: 'summary', label: 'Summary', icon: '📋' }
];

export default function ValidationComponent({ project, loading, onSubmit, activeItemId }) {
    const currentSectionIndex = sections.findIndex(section => section.id === activeItemId);

    const handlePrevious = () => {
        if (currentSectionIndex > 0) {
            eventEmitter.emit(eventItemVisible, {
                itemId: 'validation',
                subItemId: sections[currentSectionIndex - 1].id
            });
        }
    };

    const handleNext = () => {
        if (currentSectionIndex < sections.length - 1) {
            eventEmitter.emit(eventItemVisible, {
                itemId: 'validation',
                subItemId: sections[currentSectionIndex + 1].id
            });
        }
    };

    const renderContent = () => {
        const currentSection = sections.find(section => section.id === activeItemId);

        switch (activeItemId) {
            case 'user-input':
                return (
                    <ComponentCard title="Idea Validation" icon={currentSection.icon} loading={loading}>
                        <ValidationUserInputComponent
                            onSubmit={onSubmit}
                            loading={loading}
                            initialFormData={project?.data?.input?.validation || null}
                        />
                    </ComponentCard>
                );
            case 'hww':
                return (
                    <ComponentCard title="HWW" icon={currentSection.icon} loading={loading}>
                        {project?.data?.analysis?.validation?.hww ? (
                            <HwwComponent hww={project.data.analysis.validation.hww} />
                        ) : (
                            <p className="text-gray-500">Not analyzed yet</p>
                        )}
                    </ComponentCard>
                );
            case 'tam-sam-som':
                return (
                    <ComponentCard title="TAM-SAM-SOM" icon={currentSection.icon} loading={loading}>
                        {project?.data?.analysis?.validation?.tamSamSom ? (
                            <TamSamSomComponent tamSamSom={project.data.analysis.validation.tamSamSom} />
                        ) : (
                            <p className="text-gray-500">Not analyzed yet</p>
                        )}
                    </ComponentCard>
                );
            case 'competitor-analysis':
                return (
                    <ComponentCard title="Competitor Analysis" icon={currentSection.icon} loading={loading}>
                        {project?.data?.analysis?.validation?.competitorAnalysis ? (
                            <CompetitorAnalysisComponent competitorAnalysis={project.data.analysis.validation.competitorAnalysis} />
                        ) : (
                            <p className="text-gray-500">Not analyzed yet</p>
                        )}
                    </ComponentCard>
                );
            case 'summary':
                return (
                    <ComponentCard title="Summary" icon={currentSection.icon} loading={loading}>
                        {project?.data?.analysis?.validation?.summary ? (
                            <SummaryComponent summary={project.data.analysis.validation.summary} />
                        ) : (
                            <p className="text-gray-500">Not analyzed yet</p>
                        )}
                    </ComponentCard>
                );
            default:
                return null;
        }
    };

    return (
        <div className="pb-20">
            {renderContent()}
            <NavigationButtons
                onPrevious={handlePrevious}
                onNext={handleNext}
                prevLabel={currentSectionIndex > 0 ? sections[currentSectionIndex - 1].label : ''}
                nextLabel={currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1].label : ''}
            />
        </div>
    );
}