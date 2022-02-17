import express from 'express';

export const cookieHandler = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { headers: { cookie } } = req;

  if(!cookie) return next()

  const values = cookie.split(';').reduce((res, item) => {
    const [key, value] = item.trim().split('=');
    return { ...res, [key]: value };
  }, {});

  req.cookies = values;

  next();
};
