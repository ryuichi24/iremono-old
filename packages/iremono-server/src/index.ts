import express from 'express';
import { config } from './config';
import { filesRouter, foldersRouter, identityRouter } from './routes';
import { errorHandler } from './shared/express-lib';
import { loggerFactory } from './shared/utils/logger';

const logger = loggerFactory.createLogger('main');

const HOST = config.serverConfig.HOST;
const PORT = config.serverConfig.PORT;

const app = express();

app.use([express.json()]);

app.use('/api/identity', identityRouter);
app.use('/api/folders', foldersRouter);
app.use('/api/files', filesRouter);

app.get('/api/health', async (_, res) => res.send('API is running'));

app.use(errorHandler());

app.listen(PORT, () => logger.info(`Server is running at http://${HOST}:${PORT}`));
