import { Pool } from 'mysql2/promise';
import { mysqlHelper } from './mysql-helper';

interface Options {
  dbHost: string;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
}

export class MysqlDatabase {
  private static connectionPool: Pool;

  public static async connectDB({ dbHost, dbName, dbPassword, dbUsername }: Options) {
    this.connectionPool = await mysqlHelper.createConnectionPool({ dbHost, dbName, dbPassword, dbUsername });
  }

  public static getConnection() {
    return this.connectionPool;
  }
}
