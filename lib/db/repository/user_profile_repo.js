import { createClient } from "@/lib/db/dbServer";
import logger from "@/lib/logger";
import { UserProfile } from "@/lib/domain/user_profile";

const createUserProfileRepo = () => {
    // Convert UserProfile to database format
    const toDbFormat = (profile) => ({
        id: profile.id,
        subscription_plan: profile.subscriptionPlan,
        subscription_status: profile.subscriptionStatus,
    });

    // Convert database record to UserProfile
    const fromDbFormat = (record) => {
        if (!record) return null;
        return new UserProfile({
            id: record.id,
            subscriptionPlan: record.subscription_plan,
            subscriptionStatus: record.subscription_status,
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
            logger.error({ userId, error }, 'Error fetching user profile');
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
    };
};

export default createUserProfileRepo();