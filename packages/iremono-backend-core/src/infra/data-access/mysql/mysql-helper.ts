import fs from 'fs';
import mysql from 'mysql2';
import { Connection } from 'mysql2/promise';

interface Options {
  dbHost?: string;
  dbUsername?: string;
  dbPassword?: string;
  dbName?: string;
}

const createConnection = ({ dbHost, dbUsername, dbPassword, dbName }: Options) => {
  if (!dbHost || !dbUsername || !dbPassword) {
    throw new Error('Some database credentials are missing.');
  }

  let con;

  if (dbName) {
    con = mysql.createConnection({
      host: dbHost,
      user: dbUsername,
      password: dbPassword,
      database: dbName,
    });
  } else {
    con = mysql.createConnection({
      host: dbHost,
      user: dbUsername,
      password: dbPassword,
    });
  }

  return con.promise();
};

const createConnectionPool = async ({ dbHost, dbUsername, dbPassword, dbName }: Options) => {
  if (!dbHost || !dbUsername || !dbPassword) {
    throw new Error('Some database credentials are missing.');
  }

  const pool = mysql.createPool({
    host: dbHost,
    user: dbUsername,
    database: dbName,
    password: dbPassword,
  });

  const promisePool = pool.promise();

  const con = await promisePool.getConnection();

  await con.connect();
  con.release();

  return promisePool;
};

const runSqlQuery = async (sqlQuery: string, values: string[] = [], dbConnection: Connection) => {
  await dbConnection.connect();
  console.log('DB connected!');

  const result = await dbConnection.query(sqlQuery, values);
  console.log('Query successfully executed!');

  await dbConnection.end();
  return result;
};

const runSqlFile = async (pathToFile: string, dbConnection: Connection) => {
  await dbConnection.connect();
  console.log('DB connected!');
  const queryList = fs.readFileSync(pathToFile).toString().split(';');

  for (const queryItem of queryList) {
    if (!queryItem || queryItem === '\n') continue;
    await dbConnection.query(queryItem);
  }

  console.log('Query successfully executed!');
  await dbConnection.end();
};

export const mysqlHelper = Object.freeze({ createConnection, createConnectionPool, runSqlQuery, runSqlFile });
