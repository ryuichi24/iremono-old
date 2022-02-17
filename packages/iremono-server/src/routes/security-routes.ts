import express from 'express';
import { jwtService, registerEncryptionKeyController } from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const securityRouter = express
  .Router()
  .patch('/encryption-key', authHandler(jwtService), makeExpressHandler(registerEncryptionKeyController));
