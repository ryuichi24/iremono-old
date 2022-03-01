import path from 'path';
import url from 'url';
import { sqliteHelper } from '../../dist/infra/data-access/sqlite/sqlite-helper.js';

(async () => {
  const connection = sqliteHelper.createConnection({
    dbName: process.env.DB_NAME,
  });

  console.log(`Database: ${process.env.DB_NAME} has been successfully initialized!`);

  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathToFile = path.resolve(__dirname, 'init-tables.sql');

  await sqliteHelper.runSqlFile(pathToFile, connection);

  console.log(`Tables have been successfully initialized!`);
})();
