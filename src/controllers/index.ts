import { Express } from 'express';
import { mountRoute as authMountRoute } from './auth.controller';
import { mountRoute as configMountRoute } from './config.controller';
import setAPIRoutes from './api';
import { accessGuardMiddleware } from '@/middlewares/auth.middleware';

const setRoutes = (app: Express) => {
  app.use('/auth', authMountRoute());
  app.use('/config', accessGuardMiddleware, configMountRoute());
  setAPIRoutes(app);
};

export default setRoutes;
