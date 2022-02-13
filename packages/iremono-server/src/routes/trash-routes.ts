import express from 'express';
import {
  deleteFileInTrashController,
  deleteFolderInTrashController,
  jwtService,
  listItemsInTrashController,
} from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const trashRouter = express
  .Router()
  .get('/items', authHandler(jwtService), makeExpressHandler(listItemsInTrashController))
  .delete('/folders/:id', authHandler(jwtService), makeExpressHandler(deleteFolderInTrashController))
  .delete('/files/:id', authHandler(jwtService), makeExpressHandler(deleteFileInTrashController));
