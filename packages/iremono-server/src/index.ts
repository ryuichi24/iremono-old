import path from 'path';
import express from 'express';
import cors from 'cors';
import { config } from './config';
import { filesRouter, foldersRouter, authRouter, trashRouter } from './routes';
import { cookieHandler, errorHandler } from './shared/express-lib';
import { loggerFactory } from './shared/utils/logger';
import { connectDB } from './db';

const logger = loggerFactory.createLogger('main');

const main = async () => {
  await connectDB();

  const HOST = config.serverConfig.HOST;
  const PORT = config.serverConfig.PORT;

  const app = express();

  app.use([express.json(), cookieHandler(), cors({ credentials: true, origin: true })]);

  app.use('/api/auth', authRouter);
  app.use('/api/folders', foldersRouter);
  app.use('/api/files', filesRouter);
  app.use('/api/trash', trashRouter);

  app.get('/api/health', async (_, res) => res.send('API is running'));

  app.use(errorHandler());

  if (!config.serverConfig.IS_DEVELOPMENT) {
    const staticFilesDir = path.resolve('..', '..', 'packages', 'iremono-web', 'dist');

    app.use(express.static(staticFilesDir));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(staticFilesDir, 'index.html'));
    });
  }

  app.listen(PORT, () => logger.info(`Server is running at http://${HOST}:${PORT}`));
};

main();
