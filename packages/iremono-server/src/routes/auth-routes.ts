import express from 'express';
import {
  checkAuthController,
  signInController,
  signUpController,
  refreshTokenController,
  signOutController,
  accessTokenService,
} from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const authRouter = express
  .Router()
  .post('/signin', makeExpressHandler(signInController))
  .post('/signup', makeExpressHandler(signUpController))
  .post('/signout', makeExpressHandler(signOutController))
  .post('/refresh-token', makeExpressHandler(refreshTokenController))
  .get('/check', authHandler(accessTokenService), makeExpressHandler(checkAuthController));
