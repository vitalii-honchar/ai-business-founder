import { useState, useEffect } from 'react';
import projecApi from '@/lib/client/api/project_api';

const POLLING_INTERVAL = 5000;

export default function useProjectPolling(initialProject) {
    const [project, setProject] = useState(initialProject);
    const [isPolling, setIsPolling] = useState(false);

    const startPolling = () => {
        setIsPolling(true);
    };

    useEffect(() => {
        let timeoutId;

        const pollProject = async () => {
            if (!isPolling) return;

            try {
                const updatedProject = await projecApi.getProject(project.id);
                setProject(updatedProject);

                if (updatedProject?.data?.tasks?.validation?.length) {
                    timeoutId = setTimeout(pollProject, POLLING_INTERVAL);
                } else {
                    setIsPolling(false);
                }
            } catch (error) {
                console.error('Polling error:', error);
                if (isPolling) {
                    timeoutId = setTimeout(pollProject, POLLING_INTERVAL);
                }
            }
        };

        if (isPolling) {
            timeoutId = setTimeout(pollProject, POLLING_INTERVAL);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [project?.id, isPolling]);

    return { project, startPolling };
}
