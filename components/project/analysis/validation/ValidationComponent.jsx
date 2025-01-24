import NavigationButtons from '@/components/common/NavigationButtons';
import HwwComponent from '@/components/project/analysis/validation/HwwComponent'
import ValidationUserInputComponent from '@/components/project/analysis/validation/ValidationUserInputComponent'
import TamSamSomComponent from '@/components/project/analysis/validation/TamSamSomComponent'
import CompetitorAnalysisComponent from '@/components/project/analysis/validation/CompetitorAnalysisComponent';
import SummaryComponent from '@/components/project/analysis/validation/SummaryComponent';
import eventEmitter, { eventItemVisible } from '@/lib/client/eventEmitter';

const sections = [
    { id: 'user-input', label: 'User Input' },
    { id: 'hww', label: 'HWW' },
    { id: 'tam-sam-som', label: 'TAM-SAM-SOM' },
    { id: 'competitor-analysis', label: 'Competitor Analysis' },
    { id: 'summary', label: 'Summary' }
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
        switch (activeItemId) {
            case 'user-input':
                return (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">✅ Idea Validation</h2>
                        <ValidationUserInputComponent
                            onSubmit={onSubmit}
                            loading={loading}
                            initialFormData={project?.data?.input?.validation || null}
                        />
                    </div>
                );
            case 'hww':
                return (
                    <div className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                        <h2 className="text-xl font-bold mb-4">🤔 HWW</h2>
                        {loading ? (
                            <div className="h-32 bg-gray-200 rounded"></div>
                        ) : project?.data?.analysis?.validation?.hww ? (
                            <HwwComponent hww={project.data.analysis.validation.hww} />
                        ) : (
                            <p className="text-gray-500">Not analyzed yet</p>
                        )}
                    </div>
                );
            case 'tam-sam-som':
                return (
                    <div className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                        <h2 className="text-xl font-bold mb-4">📊 TAM-SAM-SOM</h2>
                        {loading ? (
                            <div className="h-32 bg-gray-200 rounded"></div>
                        ) : project?.data?.analysis?.validation?.tamSamSom ? (
                            <TamSamSomComponent tamSamSom={project.data.analysis.validation.tamSamSom} />
                        ) : (
                            <p className="text-gray-500">Not analyzed yet</p>
                        )}
                    </div>
                );
            case 'competitor-analysis':
                return (
                    <div className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                        <h2 className="text-xl font-bold mb-4">🎯 Competitor Analysis</h2>
                        {loading ? (
                            <div className="h-32 bg-gray-200 rounded"></div>
                        ) : project?.data?.analysis?.validation?.competitorAnalysis ? (
                            <CompetitorAnalysisComponent competitorAnalysis={project.data.analysis.validation.competitorAnalysis} />
                        ) : (
                            <p className="text-gray-500">Not analyzed yet</p>
                        )}
                    </div>
                );
            case 'summary':
                return (
                    <div className={`bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
                        <h2 className="text-xl font-bold mb-4">📋 Summary</h2>
                        {loading ? (
                            <div className="h-32 bg-gray-200 rounded"></div>
                        ) : project?.data?.analysis?.validation?.summary ? (
                            <SummaryComponent summary={project.data.analysis.validation.summary} />
                        ) : (
                            <p className="text-gray-500">Not analyzed yet</p>
                        )}
                    </div>
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