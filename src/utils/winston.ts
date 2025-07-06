import winston from 'winston';

interface LogParams {
  level: 'error' | 'warn' | 'info' | 'debug';
  responseCode: number;
  moduleName: string;
  message: string;
  metadata?: Record<string, any>;
}

const customFormat = winston.format.printf(({ level, timestamp, message, responseCode, moduleName, metadata }) => {
    const metadataStr = metadata ? ` - ${JSON.stringify(metadata)}` : '';
    return `[${level.toUpperCase()}] (${timestamp}): ${responseCode} - ${moduleName} - ${message}${metadataStr}`;
});

const prodLevel = process.env.ENVIRONMENT

// Create the logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat
    ),
    transports: [
        // Console transport for development
        new winston.transports.Console(),
        // File transport for production logs
        // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

export const log = ({ level, responseCode, moduleName, message, metadata }: LogParams): void => {

    if(prodLevel == 'PROD'){
        if(level == 'debug' || level == 'info') return 
    }

    logger.log({
        level,
        message,
        responseCode,
        moduleName,
        metadata
    });
};

// Convenience functions for each log level
export const logError = (responseCode: number, moduleName: string, message: string, metadata?: Record<string, any>): void => {
    log({ level: 'error', responseCode, moduleName, message, metadata });
};

export const logWarn = (responseCode: number, moduleName: string, message: string, metadata?: Record<string, any>): void => {
    log({ level: 'warn', responseCode, moduleName, message, metadata });
};

export const logInfo = (responseCode: number, moduleName: string, message: string, metadata?: Record<string, any>): void => {
    log({ level: 'info', responseCode, moduleName, message, metadata });
};

export const logDebug = (responseCode: number, moduleName: string, message: string, metadata?: Record<string, any>): void => {
    log({ level: 'debug', responseCode, moduleName, message, metadata });
};

export const winstonLogger = logger;