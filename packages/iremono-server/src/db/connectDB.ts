import { Database, DatabaseType } from '@iremono/backend-core/dist/infra/data-access';
import { config } from '../config';
import { loggerFactory } from '../shared/utils/logger';

export const connectDB = async () => {
  await Database.connectDB(
    {
      dbHost: config.dbConfig.DB_HOST,
      dbUsername: config.dbConfig.DB_USERNAME,
      dbPassword: config.dbConfig.DB_PASSWORD,
      dbName: config.dbConfig.DB_NAME,
      databaseType: config.dbConfig.DB_TYPE,
    },
    loggerFactory,
  );
};
