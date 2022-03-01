import { DatabaseType } from '@iremono/backend-core/dist/infra/data-access';

export const dbConfig = Object.freeze({
  DB_HOST: process.env.DB_HOST || '',
  DB_USERNAME: process.env.DB_USERNAME || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || '',
  DB_TYPE: (process.env.DB_TYPE || DatabaseType.SQLITE) as DatabaseType,
});
