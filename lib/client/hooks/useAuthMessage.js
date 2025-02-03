import { useState } from 'react';

export const useAuthMessage = ({ errorMessage = null, infoMessage = null } = {}) => {
    const [error, setError] = useState(errorMessage);
    const [info, setInfo] = useState(infoMessage);

    const clearMessages = () => {
        setError(null);
        setInfo(null);
    };

    return {
        error,
        setError,
        info,
        setInfo,
        clearMessages,
    };
};
