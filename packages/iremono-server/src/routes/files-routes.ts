import express from 'express';
import { config } from '../config';
import { jwtService, uploadFileController } from '../dependency-container';
import { authHandler, makeExpressHandler, uploadHandler } from '../shared/express-lib';

export const filesRouter = express
  .Router()
  .post(
    '/content',
    authHandler(jwtService),
    uploadHandler({ folderPath: config.mediaConfig.PATH_TO_MEDIA_DIR }),
    makeExpressHandler(uploadFileController),
  );
