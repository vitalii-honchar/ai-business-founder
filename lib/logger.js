import pino from 'pino';

const logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    base: undefined,
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        }
    },
    messageKey: 'message',
});

const withDuration = (log, startTime) => log.child({ duration: Date.now() - startTime });

const loggerWithProjectId = (userId, projectId) => logger.child({ userId, projectId });

export { withDuration, loggerWithProjectId };

export default logger;
