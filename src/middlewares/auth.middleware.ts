import { CustomerORM } from '@/models/Customer.orm';
import { CustomerApiKeyORM } from '@/models/CustomerApiKeys';
import { CustomerUserORM } from '@/models/CustomerUser.orm';
import { UserORM } from '@/models/User.orm';
import { oautherClient } from '@/utils/auth/oauther-client.util';
import { NextFunction, Request, Response } from 'express';

export enum AuthHeaders {
  AccessToken = 'access-token',
  CustomerUID = 'customer-uid',
  ApiKey = 'api-key',
}

export const accessGuardMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const accessToken = req.header(AuthHeaders.AccessToken) as string;
  const autherUser = await oautherClient.verifyAuthentication(accessToken);
  const user = await UserORM.findOne({
    where: {
      email: autherUser.email,
    },
  });

  if (!accessToken || !user) {
    res.status(401).send({ message: 'Token is invalid' });

    return;
  }

  req.internalData = {
    user: {
      id: user.id,
      email: user.email,
    },
  };

  next();
};

export const customerAccessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const internalData = req.internalData;

  if (!internalData) {
    res.status(401).send({ message: 'Not authorized' });

    return;
  }

  const customerUID = req.header(AuthHeaders.CustomerUID) as string;
  const customer = await CustomerORM.findOne({
    where: {
      uid: customerUID,
    },
  });

  if (!customer) {
    res.status(401).send({ message: 'Not authorized' });

    return;
  }

  const customerUserRelationship = await CustomerUserORM.findOne({
    where: {
      customerId: customer.id,
      userId: internalData.user.id,
    },
  });

  if (!customerUserRelationship) {
    res.status(403).send({ message: 'Not allowed for this credentials' });

    return;
  }

  req.internalData = { ...req.internalData!, customer: { id: customer.id } };

  next();
};

export const paymentAPIAccessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const apiKey = req.header(AuthHeaders.ApiKey) as string;
  const customerUID = req.header(AuthHeaders.CustomerUID) as string;

  if (!apiKey) {
    res.status(401).send({ message: 'Not authorized' });

    return;
  }

  const customer = await CustomerORM.findOne({
    where: {
      uid: customerUID,
    },
  });

  if (!customer) {
    res.status(401).send({ message: 'Not authorized' });

    return;
  }

  const customerApiKey = await CustomerApiKeyORM.findOne({
    where: {
      customerId: customer.id,
      apiKey,
    },
  });

  if (!customerApiKey) {
    res.status(401).send({ message: 'Not authorized' });

    return;
  }

  req.internalData = { ...req.internalData!, customer: { id: customer.id } };

  next();
};
