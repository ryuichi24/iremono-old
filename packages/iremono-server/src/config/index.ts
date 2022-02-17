import { jwtConfig } from './jwt-config';
import { loggerConfig } from './logger-config';
import { mediaConfig } from './media-config';
import { serverConfig } from './server-config';

export const config = Object.freeze({
  serverConfig,
  loggerConfig,
  jwtConfig,
  mediaConfig,
});

export type Config = typeof config;
