import express from 'express';
import { checkAuthController, jwtService, signInController, signUpController } from '../dependency-container';
import { authHandler, makeExpressHandler } from '../shared/express-lib';

export const authRouter = express
  .Router()
  .post('/signin', makeExpressHandler(signInController))
  .post('/signup', makeExpressHandler(signUpController))
  .get('/check', authHandler(jwtService), makeExpressHandler(checkAuthController));
