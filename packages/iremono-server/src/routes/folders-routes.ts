import express from 'express';
import {
  createFolderController,
  getFolderController,
  tokenService,
  listAllAncestorsController,
  listItemsInFolderController,
  removeFolderController,
  restoreFolderController,
  updateFolderController,
  createRootFolderController,
} from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const foldersRouter = express
  .Router()
  .post('/', authHandler(tokenService), makeExpressHandler(createFolderController))
  .post('/root', authHandler(tokenService), makeExpressHandler(createRootFolderController))
  .patch('/:id', authHandler(tokenService), makeExpressHandler(updateFolderController))
  .post('/:id/remove', authHandler(tokenService), makeExpressHandler(removeFolderController))
  .post('/:id/restore', authHandler(tokenService), makeExpressHandler(restoreFolderController))
  .get('/:id/items', authHandler(tokenService), makeExpressHandler(listItemsInFolderController))
  .get('/:id', authHandler(tokenService), makeExpressHandler(getFolderController))
  .get('/:id/ancestors', authHandler(tokenService), makeExpressHandler(listAllAncestorsController));
