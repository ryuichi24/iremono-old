import express from 'express';
import { TokenService } from '@iremono/backend-core/src/services';
import { loggerFactory } from '../../utils/logger';
import { UnauthorizedError } from '../../utils/errors';

const logger = loggerFactory.createLogger('authHandler');

export const authHandler =
  (tokenService: TokenService) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const token = req.get('authorization')?.slice(7);
      if (!token) throw new UnauthorizedError('no bearer token provided');
      req.user = tokenService.verifyToken(token);
      next();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(
          error.message,
          `[path="${req.originalUrl}", method="${req.method}", host="${req.hostname}", ip="${req.ip}", message="${error.message}"]`,
        );

        next(new UnauthorizedError(error.message));
      }
    }
  };
