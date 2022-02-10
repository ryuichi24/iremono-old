import { jwtConfig } from './jwt-config';
import { loggerConfig } from './logger-config';
import { serverConfig } from './server-config';

export const config = Object.freeze({
  serverConfig,
  loggerConfig,
  jwtConfig,
});
