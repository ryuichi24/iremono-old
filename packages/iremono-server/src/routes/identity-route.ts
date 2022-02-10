import express from 'express';
import { SignUpUseCase, SignInUseCase, CheckIdentityUseCase } from '@iremono/backend-core/src/use-cases';
import { constructMockIdentityRepository } from '@iremono/backend-core/src/infra/data-access';
import { constructBcryptService, constructJwtService } from '@iremono/backend-core/src/infra/services';
import { authHandler, makeExpressHandler } from '../shared/express-lib';
import { config } from '../config';
import { CheckIdentityController, SignInController, SignUpController } from '../controllers/identity';
import { loggerFactory } from '../shared/utils/logger';

// TODO: replace it once the real repository gets ready
const identityRepository = constructMockIdentityRepository();

const bcryptService = constructBcryptService();
const jwtService = constructJwtService({
  jwtSecret: config.jwtConfig.JWT_SECRET,
  jwtExpiresIn: config.jwtConfig.JWT_EXPIRE_IN,
});

const signUpUseCase = new SignUpUseCase(identityRepository, jwtService, bcryptService);
const signInUseCase = new SignInUseCase(identityRepository, jwtService, bcryptService);
const checkIdentityUseCase = new CheckIdentityUseCase(identityRepository);

const signUpController = new SignUpController(signUpUseCase, loggerFactory);
const signInController = new SignInController(signInUseCase, loggerFactory);
const checkIdentityController = new CheckIdentityController(checkIdentityUseCase, loggerFactory);

export const identityRouter = express
  .Router()
  .post('/signin', makeExpressHandler(signInController))
  .post('/signup', makeExpressHandler(signUpController))
  .get('/check', authHandler(jwtService), makeExpressHandler(checkIdentityController));
