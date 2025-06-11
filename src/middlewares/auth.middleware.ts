import { oautherClient } from '@/utils/auth/oauther-client';
import { NextFunction, Request, Response } from 'express';

export enum AuthHeaders {
  AccessToken = 'access-token',
}

export const accessGuard = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const accessToken = req.header(AuthHeaders.AccessToken) as string;
  const response = await oautherClient.verifyAuthentication(accessToken);

  if (!accessToken || !response) {
    res.status(401).send({ message: 'Token is invalid' });

    return;
  }

  next();
};
