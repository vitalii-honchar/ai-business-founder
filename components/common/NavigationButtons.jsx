const NavigationButtons = ({ onPrevious, onNext, prevLabel, nextLabel, prevIcon, nextIcon }) => {
    const hasPrevious = !!prevLabel;
    const hasNext = !!nextLabel;
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 sm:px-4 z-[60]">
            <div className="flex justify-between max-w-5xl mx-auto">
                <button
                    onClick={onPrevious}
                    disabled={!hasPrevious}
                    className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors
                        ${hasPrevious 
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50' 
                            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'}`}
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    {hasPrevious && <span className="mr-1 sm:mr-2">{prevIcon}</span>}
                    <span className="truncate">{prevLabel || 'Previous'}</span>
                </button>
                <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors
                        ${hasNext 
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50' 
                            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'}`}
                >
                    <span className="truncate">{nextLabel || 'Next'}</span>
                    {hasNext && <span className="ml-1 sm:ml-2">{nextIcon}</span>}
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NavigationButtons;
