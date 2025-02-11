import userProfileRepo from "@/lib/db/repository/user_profile_repo";
import logger from "@/lib/logger";
import { SubscriptionStatus, SubscriptionPlan } from "@/lib/domain/user_profile";

const createUserProfileService = () => {
    const getUserProfile = async (userId) => {
        const userProfile = await userProfileRepo.getUserProfile(userId);
        return userProfile;
    };

    const createUserProfile = async (userId, profileData) => {
        logger.info({ userId, profileData }, 'Creating user profile');
        const userProfile = await userProfileRepo.createUserProfile(userId, profileData);

        logger.info({ userId, profileData }, 'User profile created');
        return userProfile;
    };

    const updateUserProfile = async (userId, profileData) => {
        logger.info({ userId, profileData }, 'Updating user profile');
        const userProfile = await userProfileRepo.updateUserProfile(userId, profileData);

        logger.info({ userId, profileData }, 'User profile updated');
        return userProfile;
    };

    const isSubscriptionActive = async (userId) => {
        logger.info({ userId }, 'Checking subscription status');
        const userProfile = await getUserProfile(userId);
        
        if (!userProfile) {
            logger.info({ userId }, 'No user profile found');
            return false;
        }

        return userProfile.subscription_status === SubscriptionStatus.ACTIVE;
    };

    const getSubscriptionStatus = async (userId) => {
        logger.info({ userId }, 'Getting subscription details');
        const userProfile = await getUserProfile(userId);
        
        if (!userProfile) {
            logger.info({ userId }, 'No user profile found');
            return null;
        }

        return {
            status: userProfile.subscription_status,
            plan: userProfile.subscription_plan
        };
    };

    return {
        getUserProfile,
        createUserProfile,
        updateUserProfile,
        isSubscriptionActive,
        getSubscriptionStatus,
    };
};

export default createUserProfileService();