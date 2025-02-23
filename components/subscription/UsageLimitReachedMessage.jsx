const UsageLimitType = {
    PROJECTS: 'projects',
    VALIDATIONS: 'validations'
};

const getLimitMessage = (type, userProfile) => {
    switch (type) {
        case UsageLimitType.PROJECTS:
            return `You've reached the maximum number of projects (${userProfile.maxProjects}) for your current plan.`;
        case UsageLimitType.VALIDATIONS:
            return `You've reached the maximum number of validations (${userProfile.validationsPerProject}) for your current plan.`;
        default:
            return "You've reached the usage limit for your current plan.";
    }
};

const UsageLimitReachedMessage = ({ type, userProfile, className = '' }) => {
    return (
        <div className={`${className} max-w-3xl bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 shadow-sm`}>
            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                        <div className="flex-shrink-0 text-2xl" role="img" aria-label="warning">
                            ⚠️
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-medium text-yellow-900 mb-1">
                                Usage Limit Reached
                            </h3>
                            <p className="text-sm text-yellow-800">
                                {getLimitMessage(type, userProfile)}
                            </p>
                            <p className="text-xs text-yellow-700 mt-1">
                                Upgrade your plan to unlock higher limits and additional features.
                            </p>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <a 
                            href="/application/user-profile/subscription" 
                            className="inline-flex items-center whitespace-nowrap px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            <span>Upgrade Plan</span>
                            <span className="ml-2" role="img" aria-label="right arrow">
                                ➡️
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { UsageLimitType };
export default UsageLimitReachedMessage;
