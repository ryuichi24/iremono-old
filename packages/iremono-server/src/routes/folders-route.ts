import express from 'express';
import { createFolderController, jwtService, updateFolderController } from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const foldersRouter = express
  .Router()
  .post('/', authHandler(jwtService), makeExpressHandler(createFolderController))
  .patch('/:id', authHandler(jwtService), makeExpressHandler(updateFolderController));
