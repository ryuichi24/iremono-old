import express from 'express';
import cors from 'cors';
import { config } from './config';
import { filesRouter, foldersRouter, authRouter, trashRouter, securityRouter } from './routes';
import { cookieHandler, errorHandler } from './shared/express-lib';
import { loggerFactory } from './shared/utils/logger';
import { initMysqlDB } from './db';

const logger = loggerFactory.createLogger('main');

const main = async () => {
  await initMysqlDB();

  const HOST = config.serverConfig.HOST;
  const PORT = config.serverConfig.PORT;

  const app = express();

  app.use([express.json(), cookieHandler(), cors({ credentials: true, origin: true })]);

  app.use('/api/auth', authRouter);
  app.use('/api/folders', foldersRouter);
  app.use('/api/files', filesRouter);
  app.use('/api/trash', trashRouter);
  app.use('/api/security', securityRouter);

  app.get('/api/health', async (_, res) => res.send('API is running'));

  app.use(errorHandler());

  app.listen(PORT, () => logger.info(`Server is running at http://${HOST}:${PORT}`));
};

main();
