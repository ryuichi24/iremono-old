import path from 'path';
import url from 'url';
import { createConnection, runSqlFile } from './mysql-helper.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.resolve(__dirname, 'init-db.sql');

const connection = createConnection();

runSqlFile(pathToFile, connection);
