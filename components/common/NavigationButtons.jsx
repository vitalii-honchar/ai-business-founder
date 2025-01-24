const NavigationButtons = ({ onPrevious, onNext, prevLabel, nextLabel, prevIcon, nextIcon }) => {
    const hasPrevious = !!prevLabel;
    const hasNext = !!nextLabel;
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 sm:px-4">
            <div className="flex justify-between max-w-5xl mx-auto">
                <button
                    onClick={onPrevious}
                    disabled={!hasPrevious}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                        ${hasPrevious 
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50' 
                            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'}`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    {hasPrevious && <span className="mr-2">{prevIcon}</span>}
                    {prevLabel || 'Previous'}
                </button>
                <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                        ${hasNext 
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50' 
                            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'}`}
                >
                    {hasNext && <span className="mr-2">{nextIcon}</span>}
                    {nextLabel || 'Next'}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NavigationButtons;
