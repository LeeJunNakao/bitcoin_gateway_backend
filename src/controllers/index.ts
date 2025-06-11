import { Express } from 'express';
import { mountRoute as authMountRoute } from './auth.controller';

const setRoutes = (app: Express) => {
  app.use('/auth', authMountRoute());
};

export default setRoutes;
