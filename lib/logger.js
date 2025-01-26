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

export default logger;
