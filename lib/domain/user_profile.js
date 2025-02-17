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

export class UserProfile {

    constructor({
        id, 
        subscriptionPlan, 
        subscriptionStatus, 
        stripeCustomerId,
        stripeSubscriptionId
    }) {
        this.id = id;
        this.subscriptionPlan = subscriptionPlan || SubscriptionPlan.FREE;
        this.subscriptionStatus = subscriptionStatus || SubscriptionStatus.NEW;
        this.stripeCustomerId = stripeCustomerId;
        this.stripeSubscriptionId = stripeSubscriptionId;
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
        return Object.assign({}, this);
    }

}