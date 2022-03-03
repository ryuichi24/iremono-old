import express from 'express';
import {
  checkAuthController,
  tokenService,
  signInController,
  signUpController,
  refreshTokenController,
  signOutController,
} from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const authRouter = express
  .Router()
  .post('/signin', makeExpressHandler(signInController))
  .post('/signup', makeExpressHandler(signUpController))
  .post('/signout', makeExpressHandler(signOutController))
  .post('/refresh-token', makeExpressHandler(refreshTokenController))
  .get('/check', authHandler(tokenService), makeExpressHandler(checkAuthController));
