export const serverConfig = Object.freeze({
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || '4000',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
});
