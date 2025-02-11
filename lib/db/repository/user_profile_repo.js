import { createClient } from "@/lib/db/dbServer";
import logger from "@/lib/logger";

const createUserProfileRepo = () => {
    const getUserProfile = async (userId) => {
        const supabase = await createClient();
        const { data: userProfile, error } = await supabase
            .from('user_profiles')
            .select()
            .eq('id', userId)
            .single();

        if (error) {
            logger.error({ userId, error }, 'Error fetching user profile');
            throw error;
        }
        return userProfile;
    };

    const createUserProfile = async (userId, profileData) => {
        const supabase = await createClient();
        const { data: profile, error } = await supabase
            .from('user_profiles')
            .insert([{ id: userId, ...profileData }])
            .select()
            .single();

        if (error) {
            logger.error({ userId, error }, 'Error creating user profile');
            throw error;
        }

        return profile;
    };

    const updateUserProfile = async (userId, profileData) => {
        const supabase = await createClient();
        const { data: profile, error } = await supabase
            .from('user_profiles')
            .update(profileData)
            .eq('id', userId)
            .select()
            .single();

        if (error) {
            logger.error({ userId, error }, 'Error updating user profile');
            throw error;
        }

        return profile;
    };

    return {
        getUserProfile,
        createUserProfile,
        updateUserProfile,
    };
};


export default createUserProfileRepo();