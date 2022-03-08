import express from 'express';

export const demoModeHandler = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (process.env.IS_DEMO_MODE !== 'true') return next();

  if (
    ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) &&
    req.path !== '/api/auth/signin' &&
    req.path !== '/api/auth/signout' &&
    !/\/api\/files\/.+\/token/.test(req.path) &&
    req.path !== '/api/auth/refresh-token' &&
    req.path !== '/api/folders/root/verify-key'
  ) {
    return res.status(405).json({
      error: {
        message: 'Method not allowed.',
        timestamp: new Date().toISOString(),
      },
    });
  }

  return next();
};
