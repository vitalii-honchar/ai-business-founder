import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';

export default function AvailablePlans({ 
    selectedPlan, 
    onPlanSelect, 
    currentPlan, 
    onBack, 
    loading,
    onSubscribe 
}) {
    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Available Plans</h3>
                    <button
                        onClick={onBack}
                        className="text-gray-600 hover:text-gray-800 flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <span>←</span>
                        Back to current subscription
                    </button>
                </div>
                <SubscriptionPlans 
                    selectedPlan={selectedPlan} 
                    onPlanSelect={onPlanSelect}
                    currentPlan={currentPlan}
                />
            </div>

            {/* Action Button */}
            {selectedPlan && selectedPlan !== 'free' && (
                <div className="mt-8 text-center">
                    <button
                        onClick={onSubscribe}
                        disabled={loading}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                <span className="text-xl mr-2">💳</span>
                                Checkout
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
} 