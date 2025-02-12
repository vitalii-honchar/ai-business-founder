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

    constructor({id, subscriptionPlan, subscriptionStatus}) {
        this.id = id;
        this.subscriptionPlan = subscriptionPlan || SubscriptionPlan.FREE;
        this.subscriptionStatus = subscriptionStatus || SubscriptionStatus.NEW;
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

    get buttonConfig() {
        if (this.isNew) {
            return {
                text: "Get started with a subscription",
                icon: "🚀",
                gradient: "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            };
        }
        if (this.isActive) {
            return {
                text: "Explore Other Plans",
                icon: "💫",
                gradient: "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            };
        }
        if (this.isExpired) {
            return {
                text: "Renew Subscription",
                icon: "⚠️",
                gradient: "from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            };
        }
        if (this.isCancelled) {
            return {
                text: "Resubscribe Now",
                icon: "📝",
                gradient: "from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
            };
        }
        return null;
    }

    toString() {
        return JSON.stringify(this);
    }

    toObject() {
        return Object.assign({}, this);
    }

}