import express from 'express';
import { deleteFileInTrashController, deleteFolderInTrashController, jwtService } from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const trashRouter = express
  .Router()
  .delete('/folders/:id', authHandler(jwtService), makeExpressHandler(deleteFolderInTrashController))
  .delete('/files/:id', authHandler(jwtService), makeExpressHandler(deleteFileInTrashController));
