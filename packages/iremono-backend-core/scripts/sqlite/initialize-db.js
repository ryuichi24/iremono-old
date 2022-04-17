import fs from 'fs';
import path from 'path';
import url from 'url';
import sqlite3 from 'sqlite3';

(async () => {
  const sqlite = sqlite3.verbose();
  const connection = new sqlite.Database(process.env.DB_NAME, (err) => {
    if (err) {
      throw err;
    }
    console.log(`it has successfully connected to database: ${process.env.DB_NAME}!`);
  });

  console.log(`Database: ${process.env.DB_NAME} has been successfully initialized!`);

  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathToFile = path.resolve(__dirname, 'init-tables.sql');

  runSqlFile(pathToFile, connection);

  console.log(`Tables have been successfully initialized!`);
})();

function runSqlFile(pathToFile, dbConnection) {
  const queryList = fs.readFileSync(pathToFile).toString().split(';');

  for (const queryItem of queryList) {
    if (!queryItem || queryItem === '\n') continue;
    dbConnection.run(queryItem, [], (err) => {
      if (err) {
        dbConnection.close();
        throw err;
      }
      return;
    });
  }

  console.log('Query successfully executed!');
  dbConnection.close();
}
