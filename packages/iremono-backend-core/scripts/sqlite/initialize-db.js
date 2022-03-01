import path from 'path';
import url from 'url';
import { createConnection, runSqlFile } from './sqlite-helper.js';

(async () => {
  const connection = createConnection({
    dbName: process.env.DB_NAME,
  });

  console.log(`Database: ${process.env.DB_NAME} has been successfully initialized!`);

  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathToFile = path.resolve(__dirname, 'init-tables.sql');

  await runSqlFile(pathToFile, connection);

  console.log(`Tables have been successfully initialized!`);
})();
