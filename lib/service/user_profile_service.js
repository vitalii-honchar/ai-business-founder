import userProfileRepo from "@/lib/db/repository/user_profile_repo";
import logger from "@/lib/logger";

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

    return {
        getUserProfile,
        createUserProfile,
        updateUserProfile,
    };
};


export default createUserProfileService();