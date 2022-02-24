import express from 'express';
import {
  createFolderController,
  getRootFolderController,
  jwtService,
  listItemsInFolderController,
  removeFolderController,
  restoreFolderController,
  updateFolderController,
} from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const foldersRouter = express
  .Router()
  .post('/', authHandler(jwtService), makeExpressHandler(createFolderController))
  .patch('/:id', authHandler(jwtService), makeExpressHandler(updateFolderController))
  .post('/:id/remove', authHandler(jwtService), makeExpressHandler(removeFolderController))
  .post('/:id/restore', authHandler(jwtService), makeExpressHandler(restoreFolderController))
  .get('/:id/items', authHandler(jwtService), makeExpressHandler(listItemsInFolderController))
  .get('/root', authHandler(jwtService), makeExpressHandler(getRootFolderController));
