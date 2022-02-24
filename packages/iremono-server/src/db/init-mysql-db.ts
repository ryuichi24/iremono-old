import { MysqlDatabase } from '@iremono/backend-core/dist/infra/data-access';
import { config } from '../config';
import { loggerFactory } from '../shared/utils/logger';

export const initMysqlDB = async () => {
  await MysqlDatabase.initConnectionPool(
    {
      host: config.dbConfig.DB_HOST,
      user: config.dbConfig.DB_USERNAME,
      password: config.dbConfig.DB_PASSWORD,
      database: config.dbConfig.DB_NAME,
    },
    loggerFactory,
  );
};
