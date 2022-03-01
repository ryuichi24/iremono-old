import fs from 'fs';
import sqlite3 from 'sqlite3';

interface Options {
  dbName: string;
}

const createConnection = ({ dbName }: Options) => {
  const sqlite = sqlite3.verbose();
  const connection = new sqlite.Database(dbName, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`it has successfully connected to database: ${dbName}!`);
  });

  const all = async (query: string, params: string[] = []) =>
    new Promise((resolve, reject) => {
      connection.all(query, params, (err, rows) => {
        if (err) return reject(err);

        return resolve(rows);
      });
    });

  const get = async (query: string, params: string[] = []) =>
    new Promise((resolve, reject) => {
      connection.get(query, params, (err, row) => {
        if (err) return reject(err);

        return resolve(row);
      });
    });

  const run = async (query: string, params: string[] = []) =>
    new Promise<void>((resolve, reject) => {
      connection.run(query, params, (err) => {
        if (err) return reject(err);

        return resolve();
      });
    });

  const close = () => {
    connection.close();
  };

  return Object.freeze({ all, get, run, close });
};

const runSqlFile = async (pathToFile: string, dbConnection: any) => {
  const queryList = fs.readFileSync(pathToFile).toString().split(';');

  for (const queryItem of queryList) {
    if (!queryItem || queryItem === '\n') continue;
    await dbConnection.run(queryItem);
  }

  console.log('Query successfully executed!');
  await dbConnection.close();
};

export const sqliteHelper = Object.freeze({ createConnection, runSqlFile });

export type SqliteConnection = ReturnType<typeof createConnection>;
