import { LoggerFactory } from '@iremono/util/src/logger';
import { config } from '../../../config';

export const loggerFactory = new LoggerFactory({ miniumLoggingLevel: config.loggerConfig.LOGGING_MIN_LEVEL });
