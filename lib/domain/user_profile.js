export const SubscriptionPlan = Object.freeze({
    FREE: 'free',
    HOBBY: 'hobby',
    PRO: 'pro',
});

export const SubscriptionStatus = Object.freeze({
    NEW: 'new',
    ACTIVE: 'active',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
});

export const PlanLimits = Object.freeze({
    [SubscriptionPlan.FREE]: {
        maxProjects: 3,
        validationsPerProject: 5,
    },
    [SubscriptionPlan.HOBBY]: {
        maxProjects: 20,
        validationsPerProject: Infinity,
    },
    [SubscriptionPlan.PRO]: {
        maxProjects: Infinity,
        validationsPerProject: Infinity,
    },
});

