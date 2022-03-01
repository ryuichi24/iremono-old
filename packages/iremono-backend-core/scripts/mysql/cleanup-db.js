import { mysqlHelper } from '../../dist/infra/data-access/mysql/mysql-helper.js';

(async () => {
  const connectionWithoutDB = mysqlHelper.createConnection({
    dbHost: process.env.DB_HOST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
  });

  await mysqlHelper.runSqlQuery('DROP DATABASE IF EXISTS ??;', [process.env.DB_NAME], connectionWithoutDB);
})();
