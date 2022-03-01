import { createConnection, runSqlQuery } from './mysql-helper.js';

(async () => {
  const connectionWithoutDB = createConnection({
    dbHost: process.env.DB_HOST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
  });

  await runSqlQuery('DROP DATABASE IF EXISTS ??;', [process.env.DB_NAME], connectionWithoutDB);
})();
