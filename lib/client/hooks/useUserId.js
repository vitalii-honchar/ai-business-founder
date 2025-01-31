import { getUserId } from '@/lib/db/dbClient';
import { useState, useEffect } from 'react';

const useUserId = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            setUserId(await getUserId());
        };

        fetchUserId();
    }, [userId]);

    return { userId };
};

export default useUserId;