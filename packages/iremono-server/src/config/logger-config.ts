export const loggerConfig = Object.freeze({
  LOGGING_MIN_LEVEL: parseInt(process.env.LOGGING_MIN_LEVEL || '2'),
  PRODUCTION_ERROR_MESSAGE: process.env.PRODUCTION_ERROR_MESSAGE || 'an error occurred while processing your request',
});
