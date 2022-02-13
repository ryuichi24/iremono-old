import express from 'express';
import { config } from '../config';
import {
  cryptoService,
  downloadFileController,
  downloadFileThumbnailController,
  jwtService,
  removeFileController,
  restoreFileController,
  updateFileController,
  uploadFileController,
} from '../dependency-container';
import { authHandler, makeExpressHandler, uploadHandler } from '../shared/express-lib';

export const filesRouter = express
  .Router()
  .post(
    '/content',
    authHandler(jwtService),
    uploadHandler(
      { folderPath: config.mediaConfig.PATH_TO_MEDIA_DIR, encryptionKey: config.mediaConfig.ENCRYPTION_KEY },
      cryptoService,
    ),
    makeExpressHandler(uploadFileController),
  )
  .get('/:id/content', authHandler(jwtService), makeExpressHandler(downloadFileController))
  .get('/:id/thumbnail', authHandler(jwtService), makeExpressHandler(downloadFileThumbnailController))
  .patch('/:id', authHandler(jwtService), makeExpressHandler(updateFileController))
  .post('/:id/remove', authHandler(jwtService), makeExpressHandler(removeFileController))
  .post('/:id/restore', authHandler(jwtService), makeExpressHandler(restoreFileController));
