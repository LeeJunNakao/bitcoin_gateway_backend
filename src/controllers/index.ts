import { Express } from 'express';
import { mountRoute as registerMountRoute } from './register.controller';
import { mountRoute as authMountRoute } from './auth.controller';

const setRoutes = (app: Express) => {
  app.use('/register', registerMountRoute());
  app.use('/auth', authMountRoute());
};

export default setRoutes;
