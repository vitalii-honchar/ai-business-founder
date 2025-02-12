import userProfileRepo from "@/lib/db/repository/user_profile_repo";
import logger from "@/lib/logger";
import { UserProfile } from "@/lib/domain/user_profile";

const createUserProfileService = () => {
    const getUserProfile = async (userId) => {
        const userProfile = await userProfileRepo.getUserProfile(userId);
        return userProfile;
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

    return {
        getUserProfile,
        createUserProfile,
        updateUserProfile,
    };
};

export default createUserProfileService();