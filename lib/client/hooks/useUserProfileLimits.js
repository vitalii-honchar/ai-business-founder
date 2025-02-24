import { useState, useEffect, useCallback } from 'react';
import userProfileApi from '@/lib/client/api/user_profile_api';

export default function useUserProfileLimits(userId) {
    const [limits, setLimits] = useState(null);

    const updateLimits = async () => {
        if (!userId) {
            return;
        }

        try {
            const profileLimits = await userProfileApi.getProfileLimits(userId);
            setLimits(profileLimits);
        } catch (error) {
            console.error('Error fetching user profile limits:', error);
        }
    };

    useEffect(() => {
        updateLimits();
    }, [userId]);

    return {
        userProfileLimits: limits,
        updateUserProfileLimits: updateLimits
    };
}