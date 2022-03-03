import express from 'express';
import { config } from '../config';
import {
  cryptoService,
  downloadFileController,
  downloadFileThumbnailController,
  tokenService,
  removeFileController,
  restoreFileController,
  streamVideoController,
  updateFileController,
  uploadFileController,
  userRepository,
  getFileTokenController,
} from '../dependency-container';
import { authHandler, clientEncryptionKeyHandler, makeExpressHandler, uploadHandler } from '../shared/express-lib';

export const filesRouter = express
  .Router()
  .post(
    '/content',
    authHandler(tokenService),
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
        encryptionKeyForClientEncryptionKey: config.mediaConfig.ENCRYPTION_KEY_FOR_CLIENT_ENCRYPTION_KEY,
      },
      cryptoService,
      userRepository,
    ),
    makeExpressHandler(uploadFileController),
  )
  .get('/:id/content', makeExpressHandler(downloadFileController))
  .post('/:id/token', authHandler(tokenService), makeExpressHandler(getFileTokenController))
  .get('/:id/thumbnail', authHandler(tokenService), makeExpressHandler(downloadFileThumbnailController))
  .patch('/:id', authHandler(tokenService), makeExpressHandler(updateFileController))
  .post('/:id/remove', authHandler(tokenService), makeExpressHandler(removeFileController))
  .post('/:id/restore', authHandler(tokenService), makeExpressHandler(restoreFileController))
  .get('/:id/video', makeExpressHandler(streamVideoController));
