import { SqliteConnection, sqliteHelper } from './sqlite-helper';

interface Options {
  dbName: string;
}

export class SqliteDatabase {
  private static connection: SqliteConnection;

  public static async connectDB({ dbName }: Options) {
    try {
      this.connection = sqliteHelper.createConnection({ dbName });
    } catch (error) {
      throw error;
    }
  }

  public static getConnection() {
    return this.connection;
  }
}
