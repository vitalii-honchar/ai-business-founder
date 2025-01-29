import { useState, useEffect } from 'react';
import projecApi from '@/lib/client/api/project_api';

const POLLING_INTERVAL = 3000;

const hasAnyTasks = (tasks) => {
    if (!tasks) return false;
    return Object.values(tasks).some(taskList => Array.isArray(taskList) && taskList.length > 0);
};

export default function useProjectPolling(initialProject) {
    const [project, setProject] = useState(initialProject);
    const [isPolling, setIsPolling] = useState(hasAnyTasks(initialProject?.data?.tasks));

    const startPolling = (project) => {
        setProject(project);
        setIsPolling(true);
    };

    useEffect(() => {
        let timeoutId;

        const pollProject = async () => {
            if (!isPolling) return;

            try {
                console.log('Polling project:', project.id);
                const updatedProject = await projecApi.getProject(project.id);
                setProject(updatedProject);

                if (hasAnyTasks(updatedProject?.data?.tasks)) {
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
