import { dbConfig } from './db-config';
import { jwtConfig } from './jwt-config';
import { loggerConfig } from './logger-config';
import { mediaConfig } from './media-config';
import { serverConfig } from './server-config';

export const config = Object.freeze({
  serverConfig,
  loggerConfig,
  jwtConfig,
  mediaConfig,
  dbConfig,
});

export type Config = typeof config;
