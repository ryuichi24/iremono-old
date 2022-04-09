import express from 'express';
import {
  deleteAllInTrashController,
  deleteFileInTrashController,
  deleteFolderInTrashController,
  accessTokenService,
  listItemsInTrashController,
} from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const trashRouter = express
  .Router()
  .get('/items', authHandler(accessTokenService), makeExpressHandler(listItemsInTrashController))
  .delete('/folders/:id', authHandler(accessTokenService), makeExpressHandler(deleteFolderInTrashController))
  .delete('/files/:id', authHandler(accessTokenService), makeExpressHandler(deleteFileInTrashController))
  .delete('/items', authHandler(accessTokenService), makeExpressHandler(deleteAllInTrashController));
