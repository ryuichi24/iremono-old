import express from 'express';
import { config } from '../config';
import {
  cryptoService,
  downloadFileController,
  downloadFileThumbnailController,
  accessTokenService,
  removeFileController,
  restoreFileController,
  streamVideoController,
  updateFileController,
  uploadFileController,
  getFileTokenController,
} from '../dependency-container';
import { authHandler, clientEncryptionKeyHandler, makeExpressHandler, uploadHandler } from '../shared/express-lib';

export const filesRouter = express
  .Router()
  .post(
    '/content',
    authHandler(accessTokenService),
    uploadHandler(
      {
        mediaDirPath: config.mediaConfig.PATH_TO_MEDIA_DIR,
        mediaDirName: config.mediaConfig.MEDIA_DIR_NAME,
        encryptionKey: config.mediaConfig.ENCRYPTION_KEY,
      },
      cryptoService,
    ),
    clientEncryptionKeyHandler(
      {
        mediaDirPath: config.mediaConfig.PATH_TO_MEDIA_DIR,
        mediaDirName: config.mediaConfig.MEDIA_DIR_NAME,
      },
      cryptoService,
    ),
    makeExpressHandler(uploadFileController),
  )
  .get('/:id/content', makeExpressHandler(downloadFileController))
  .post('/:id/token', authHandler(accessTokenService), makeExpressHandler(getFileTokenController))
  .get('/:id/thumbnail', authHandler(accessTokenService), makeExpressHandler(downloadFileThumbnailController))
  .patch('/:id', authHandler(accessTokenService), makeExpressHandler(updateFileController))
  .post('/:id/remove', authHandler(accessTokenService), makeExpressHandler(removeFileController))
  .post('/:id/restore', authHandler(accessTokenService), makeExpressHandler(restoreFileController))
  .get('/:id/video', makeExpressHandler(streamVideoController));
