import express from 'express';
import {
  createFolderController,
  getFolderController,
  accessTokenService,
  listAllAncestorsController,
  listItemsInFolderController,
  removeFolderController,
  restoreFolderController,
  updateFolderController,
  createRootFolderController,
  verifyClientEncryptionKeyController,
} from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const foldersRouter = express
  .Router()
  .post('/', authHandler(accessTokenService), makeExpressHandler(createFolderController))
  .post('/root', authHandler(accessTokenService), makeExpressHandler(createRootFolderController))
  .post('/root/verify-key', authHandler(accessTokenService), makeExpressHandler(verifyClientEncryptionKeyController))
  .patch('/:id', authHandler(accessTokenService), makeExpressHandler(updateFolderController))
  .post('/:id/remove', authHandler(accessTokenService), makeExpressHandler(removeFolderController))
  .post('/:id/restore', authHandler(accessTokenService), makeExpressHandler(restoreFolderController))
  .get('/:id/items', authHandler(accessTokenService), makeExpressHandler(listItemsInFolderController))
  .get('/:id', authHandler(accessTokenService), makeExpressHandler(getFolderController))
  .get('/:id/ancestors', authHandler(accessTokenService), makeExpressHandler(listAllAncestorsController));
