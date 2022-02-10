export const jwtConfig = Object.freeze({
  JWT_SECRET: process.env.JWT_SECRET || 'jwt-secret',
  JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || '600000',
});
