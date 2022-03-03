import express from 'express';
import { tokenService, registerEncryptionKeyController } from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const securityRouter = express
  .Router()
  .patch('/encryption-key', authHandler(tokenService), makeExpressHandler(registerEncryptionKeyController));
