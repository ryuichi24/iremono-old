import express from 'express';
import {
  deleteAllInTrashController,
  deleteFileInTrashController,
  deleteFolderInTrashController,
  tokenService,
  listItemsInTrashController,
} from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const trashRouter = express
  .Router()
  .get('/items', authHandler(tokenService), makeExpressHandler(listItemsInTrashController))
  .delete('/folders/:id', authHandler(tokenService), makeExpressHandler(deleteFolderInTrashController))
  .delete('/files/:id', authHandler(tokenService), makeExpressHandler(deleteFileInTrashController))
  .delete('/items', authHandler(tokenService), makeExpressHandler(deleteAllInTrashController));
