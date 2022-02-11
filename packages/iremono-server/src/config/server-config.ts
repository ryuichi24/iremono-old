export const serverConfig = Object.freeze({
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || '4000',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  PRODUCTION_ERROR_MESSAGE: process.env.PRODUCTION_ERROR_MESSAGE || 'an error occurred while processing your request',
});
