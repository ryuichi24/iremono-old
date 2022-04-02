import express from 'express';

export const loggerHandler =
  (logger: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.info(`[path="${req.originalUrl}", method="${req.method}", host="${req.hostname}", ip="${req.ip}"]`);
    next();
  };
