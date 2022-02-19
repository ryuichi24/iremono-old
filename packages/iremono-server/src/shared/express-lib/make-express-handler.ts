import express from 'express';
import { isObject } from '@iremono/util';
import { Controller, HttpRequest } from '../controller-lib';
import { AuthError, DoesNotExistError, ValidationError } from '@iremono/backend-core/dist/shared/utils/errors';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errors';

const expressAsyncHandlerWrapper =
  (fn: (req: express.Request, res: express.Response) => Promise<any>) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res)).catch((err) => {
      if (err instanceof AuthError) return next(new UnauthorizedError(err.message, err.stack));
      if (err instanceof ValidationError) return next(new BadRequestError(err.message, err.stack));
      if (err instanceof DoesNotExistError) return next(new NotFoundError(err.message, err.stack));

      next(err);
    });

const makeHttpRequestFromExpressRequest = (req: express.Request): HttpRequest => ({
  body: req.body,
  query: req.query as { [key: string]: string },
  params: req.params,
  cookies: req.cookies,
  ip: req.ip,
  ips: req.ips,
  method: req.method,
  path: req.path,
  fullPath: req.originalUrl,
  host: req.hostname,
  baseUrl: req.baseUrl,
  user: req.user || {},
  uploadedFile: req.uploadedFile || {},
});

export const makeExpressHandler = (controller: Controller) =>
  expressAsyncHandlerWrapper(async (req: express.Request, res: express.Response) => {
    const httpRequest = makeHttpRequestFromExpressRequest(req);
    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.hasHeaders)
      Object.entries(httpResponse.headers).forEach(([key, value]) => res.setHeader(key, value));

    if (httpResponse.readableStream) return httpResponse.readableStream.pipe(res);

    const expressResponseAction = isObject(httpResponse.body) ? 'json' : 'send';
    return res.status(httpResponse.statusCode)[expressResponseAction](httpResponse.body || '');
  });
