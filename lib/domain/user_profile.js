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

export class SubscriptionError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
        this.name = 'SubscriptionError';
    }
}

export class Usage {

    constructor({
        maxProjects,
        validationsPerProject,
    }) {
        this.maxProjects = maxProjects ?? 0;
        this.validationsPerProject = validationsPerProject ?? 0;
    }

    toObject() {
        return JSON.parse(JSON.stringify(this));
    }
}

export class UserProfile {

    constructor({
        id, 
        subscriptionPlan, 
        subscriptionStatus, 
        stripeCustomerId,
        stripeSubscriptionId,
        subscriptionStartDate,
        subscriptionEndDate,
        usage,
    }) {
        this.id = id;
        this.subscriptionPlan = subscriptionPlan || SubscriptionPlan.FREE;
        this.subscriptionStatus = subscriptionStatus || SubscriptionStatus.NEW;
        this.stripeCustomerId = stripeCustomerId;
        this.stripeSubscriptionId = stripeSubscriptionId;
        this.subscriptionStartDate = subscriptionStartDate;
        this.subscriptionEndDate = subscriptionEndDate;
        this.usage = usage;
    }

    get isActive() {
        return this.subscriptionStatus === SubscriptionStatus.ACTIVE;
    }

    get isExpired() {
        return this.subscriptionStatus === SubscriptionStatus.EXPIRED;
    }

    get isCancelled() {
        return this.subscriptionStatus === SubscriptionStatus.CANCELLED;
    }

    get isNew() {
        return this.subscriptionStatus === SubscriptionStatus.NEW;
    }

    toString() {
        return JSON.stringify(this);
    }

    toObject() {
        return JSON.parse(JSON.stringify(this));
    }

    isMaxProjectsReached() {
        return this.usage.maxProjects >= PlanLimits[this.subscriptionPlan].maxProjects;
    }

    get maxProjects() {
        return PlanLimits[this.subscriptionPlan].maxProjects;
    }

    get maxValidationsPerProject() {
        return PlanLimits[this.subscriptionPlan].validationsPerProject;
    }
}