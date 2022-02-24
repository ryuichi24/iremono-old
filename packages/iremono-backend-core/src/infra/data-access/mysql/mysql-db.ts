import mysql from 'mysql2';
import { Pool } from 'mysql2/promise';
import { LoggerFactory } from '@iremono/util';

interface Options {
  host: string;
  user: string;
  password: string;
  database: string;
}

export class MysqlDatabase {
  public static connectionPool: Pool;

  public static async initConnectionPool({ host, user, password, database }: Options, loggerFactory: LoggerFactory) {
    try {
      const logger = loggerFactory.createLogger('MysqlDatabase');

      const pool = mysql.createPool({ host, user, database, password });

      const promisePool = pool.promise();

      const con = await promisePool.getConnection();

      await con.connect();

      logger.info('Successfully connected to database!');

      this.connectionPool = promisePool;
    } catch (error) {
      throw error;
    }
  }

  public static getConnectionPool() {
    return this.connectionPool;
  }
}
