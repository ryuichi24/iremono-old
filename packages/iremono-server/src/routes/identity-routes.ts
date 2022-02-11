import express from 'express';
import {
  checkIdentityController,
  jwtService,
  signInController,
  signUpController,
} from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const identityRouter = express
  .Router()
  .post('/signin', makeExpressHandler(signInController))
  .post('/signup', makeExpressHandler(signUpController))
  .get('/check', authHandler(jwtService), makeExpressHandler(checkIdentityController));
