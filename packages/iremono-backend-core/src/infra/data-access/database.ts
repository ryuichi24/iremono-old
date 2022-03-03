import { LoggerFactory } from '@iremono/util';
import { MysqlDatabase } from './mysql';
import { SqliteDatabase } from './sqlite';

export enum DatabaseType {
  MYSQL = 'mysql',
  SQLITE = 'sqlite',
}

interface Options {
  dbHost: string;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  databaseType: DatabaseType;
}

export class Database {
  public static async connectDB(
    { dbHost, dbName, dbPassword, dbUsername, databaseType }: Options,
    loggerFactory: LoggerFactory,
  ) {
    try {
      const logger = loggerFactory.createLogger('Database');

      if (databaseType === DatabaseType.MYSQL) {
        await MysqlDatabase.connectDB({ dbHost, dbName, dbPassword, dbUsername });
        logger.info('it has successfully connected to MySQL!');
        return;
      }

      if (databaseType === DatabaseType.SQLITE) {
        SqliteDatabase.connectDB({ dbName });
        logger.info('it has successfully connected to SQLite!');
        return;
      }

      throw new Error('Invalid database type provided');
    } catch (error) {
      throw error;
    }
  }
}
