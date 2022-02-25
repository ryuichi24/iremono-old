import fs from 'fs';
import mysql from 'mysql2';

export const createConnection = ({ hasDatabase } = {}) => {
  const dbHost = process.env.DB_HOST;
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;

  if (!dbHost || !dbUsername || !dbPassword) {
    throw new Error('Some database credentials are missing.');
  }

  let con;

  if (hasDatabase) {
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

  return con;
};

export const runSqlFile = (pathToFile, dbConnection) => {
  dbConnection.connect((err) => {
    if (err) throw err;
    console.log('DB connected!');

    const queryList = fs.readFileSync(pathToFile).toString().split(';');

    queryList.forEach((query) => {
      if (!query || query === '\n') return;

      dbConnection.query(query, function (err, result) {
        if (err) throw err;
      });
    });

    console.log('Query successfully executed!');
    dbConnection.end();
  });
};
