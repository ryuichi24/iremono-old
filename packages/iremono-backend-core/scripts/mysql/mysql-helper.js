import fs from 'fs';
import mysql from 'mysql2';

export const createConnection = ({ dbHost, dbUsername, dbPassword, dbName } = {}) => {
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

export const runSqlQuery = async (sqlQuery, values = [], dbConnection) => {
  await dbConnection.connect();
  console.log('DB connected!');

  const result = await dbConnection.query(sqlQuery, values);
  console.log('Query successfully executed!');

  await dbConnection.end();
  return result;
};

export const runSqlFile = async (pathToFile, dbConnection) => {
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
