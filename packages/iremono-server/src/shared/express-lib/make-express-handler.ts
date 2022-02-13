import express from 'express';
import { isObject } from '@iremono/util';
import { Controller, HttpRequest } from '../controller-lib';

const expressAsyncHandlerWrapper =
  (fn: (req: express.Request, res: express.Response) => Promise<any>) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res)).catch(next);

const makeHttpRequestFromExpressRequest = (req: express.Request): HttpRequest => ({
  body: req.body,
  query: req.query as { [key: string]: string },
  params: req.params,
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
