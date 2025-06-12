import { Express } from 'express';
import { mountRoute as authMountRoute } from './auth.controller';
import { mountRoute as configMountRoute } from './config.controller';
import { customerAccessMiddleware } from '@/middlewares/auth.middleware';

const setRoutes = (app: Express) => {
  app.use('/auth', authMountRoute());
  app.use('/config', customerAccessMiddleware, configMountRoute());
};

export default setRoutes;
