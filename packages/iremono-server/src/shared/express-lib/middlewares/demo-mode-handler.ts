import express from 'express';

export const demoModeHandler = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (process.env.IS_DEMO_MODE !== 'true') return next();

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && req.path !== '/api/auth/signin')
    return res.status(405).json({
      error: {
        message: 'Method not allowed.',
        timestamp: new Date().toISOString(),
      },
    });

  return next();
};
