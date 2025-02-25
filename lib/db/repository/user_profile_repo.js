import { createClient } from "@/lib/db/dbServer";
import logger from "@/lib/logger";
import { UserProfile, Usage } from "@/lib/domain/user_profile";

const createUserProfileRepo = () => {
    // Convert UserProfile to database format
    const toDbFormat = (profile) => ({
        id: profile.id,
        subscription_plan: profile.subscriptionPlan,
        subscription_status: profile.subscriptionStatus,
        stripe_customer_id: profile.stripeCustomerId,
        stripe_subscription_id: profile.stripeSubscriptionId,
        usage: profile.usage ? profile.usage.toObject() : {},
        subscription_start_date: profile.subscriptionStartDate,
        subscription_end_date: profile.subscriptionEndDate
    });

    // Convert database record to UserProfile
    const fromDbFormat = (record) => {
        if (!record) return null;
        return new UserProfile({
            id: record.id,
            subscriptionPlan: record.subscription_plan,
            subscriptionStatus: record.subscription_status,
            stripeCustomerId: record.stripe_customer_id,
            stripeSubscriptionId: record.stripe_subscription_id,
            usage: record.usage ? new Usage(record.usage) : new Usage({}),
            subscriptionStartDate: record.subscription_start_date,
            subscriptionEndDate: record.subscription_end_date
        });
    };

    const getUserProfile = async (userId) => {
        const supabase = await createClient();
        const { data: record, error } = await supabase
            .from('user_profiles')
            .select()
            .eq('id', userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            logger.error({ userId, error: error.message, stack: error.stack }, 'Error fetching user profile');
            throw error;
        }

        return fromDbFormat(record);
    };

    const getUserProfileByStripeCustomerId = async (stripeCustomerId) => {
        const supabase = await createClient();
        const { data: record, error } = await supabase
            .from('user_profiles')
            .select()
            .eq('stripe_customer_id', stripeCustomerId)
            .single();

        if (error) {
            logger.error({ stripeCustomerId, error }, 'Error fetching user profile by Stripe customer ID');
            throw error;
        }

        return fromDbFormat(record);
    };

    const createUserProfile = async (userProfile) => {
        const supabase = await createClient();
        const dbData = toDbFormat(userProfile);

        const { data: record, error } = await supabase
            .from('user_profiles')
            .insert([dbData])
            .select()
            .single();

        if (error) {
            logger.error({ userProfile: userProfile.toString(), error }, 'Error creating user profile');
            throw error;
        }

        return fromDbFormat(record);
    };

    const updateUserProfile = async (userProfile) => {
        const supabase = await createClient();
        const dbData = toDbFormat(userProfile);

        const { data: record, error } = await supabase
            .from('user_profiles')
            .update(dbData)
            .eq('id', userProfile.id)
            .select()
            .single();

        if (error) {
            logger.error({ userProfile: userProfile.toString(), error }, 'Error updating user profile');
            throw error;
        }

        return fromDbFormat(record);
    };

    return {
        getUserProfile,
        createUserProfile,
        updateUserProfile,
        getUserProfileByStripeCustomerId,
    };
};

export default createUserProfileRepo();