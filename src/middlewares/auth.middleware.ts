import { NextFunction, Request, Response } from 'express';

export enum AuthHeaders {
  AccessToken = 'access-token',
}

export const accessGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  const accessToken = req.header(AuthHeaders.AccessToken);

  if (!ACCESS_TOKEN || accessToken !== ACCESS_TOKEN) {
    res.status(401).send({ message: 'Token is invalid' });

    return;
  }

  next();
};
