import path from 'path';
import url from 'url';
import { mysqlHelper } from '../../dist/infra/data-access/mysql/mysql-helper.js';

(async () => {
  const connectionWithoutDB = mysqlHelper.createConnection({
    dbHost: process.env.DB_HOST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
  });

  await mysqlHelper.runSqlQuery('CREATE DATABASE IF NOT EXISTS ??;', [process.env.DB_NAME], connectionWithoutDB);

  console.log(`Database: ${process.env.DB_NAME} has been successfully initialized!`);

  const connectionWithDB = mysqlHelper.createConnection({
    dbHost: process.env.DB_HOST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  });

  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathToFile = path.resolve(__dirname, 'init-tables.sql');

  await mysqlHelper.runSqlFile(pathToFile, connectionWithDB);

  console.log(`Tables have been successfully initialized!`);
})();
