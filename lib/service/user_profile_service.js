import userProfileRepo from "@/lib/db/repository/user_profile_repo";
import logger from "@/lib/logger";
import { UserProfile, Usage, SubscriptionStatus } from "@/lib/domain/user_profile";
import { getUserId } from "@/lib/db/dbServer";

const SUBSCRIPTION_DURATION_30_DAYS = 30 * 24 * 60 * 60 * 1000;

const createUserProfileService = () => {
    const getUserProfile = async (userId) => {
        const userProfile = await userProfileRepo.getUserProfile(userId);
        return userProfile;
    };

    const getCurrentUserProfile = async () => {
        const userId = await getUserId();
        return getUserProfile(userId);
    };

    const createUserProfile = async (userProfile) => {
        if (!(userProfile instanceof UserProfile)) {
            throw new Error('userProfile must be an instance of UserProfile');
        }

        logger.info({ userProfile: userProfile.toString() }, 'Creating user profile');
        const createdProfile = await userProfileRepo.createUserProfile(userProfile);
        logger.info({ userProfile: createdProfile.toString() }, 'User profile created');
        
        return createdProfile;
    };

    const updateUserProfile = async (userProfile) => {
        if (!(userProfile instanceof UserProfile)) {
            throw new Error('userProfile must be an instance of UserProfile');
        }

        logger.info({ userProfile: userProfile.toString() }, 'Updating user profile');
        const updatedProfile = await userProfileRepo.updateUserProfile(userProfile);
        logger.info({ userProfile: updatedProfile.toString() }, 'User profile updated');
        
        return updatedProfile;
    };

    const activateSubscription = async (userProfile) => {
        if (!(userProfile instanceof UserProfile)) {
            throw new Error('userProfile must be an instance of UserProfile');
        }
        userProfile.subscriptionStatus = SubscriptionStatus.ACTIVE;

        userProfile.subscriptionStartDate = new Date();
        userProfile.subscriptionEndDate = new Date(userProfile.subscriptionStartDate.getTime() + SUBSCRIPTION_DURATION_30_DAYS);
        userProfile.usage = new Usage({});

        await updateUserProfile(userProfile);
    }

    return {
        getUserProfile,
        getCurrentUserProfile,
        createUserProfile,
        updateUserProfile,
        activateSubscription,
    };
};

export default createUserProfileService();