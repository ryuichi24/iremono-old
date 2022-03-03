import { dbConfig } from './db-config';
import { tokenConfig } from './token-config';
import { loggerConfig } from './logger-config';
import { mediaConfig } from './media-config';
import { serverConfig } from './server-config';

export const config = Object.freeze({
  serverConfig,
  loggerConfig,
  tokenConfig,
  mediaConfig,
  dbConfig,
});

export type Config = typeof config;
