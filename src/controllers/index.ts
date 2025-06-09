import { Express } from 'express';
import { mountRoute } from './Register.controller';
import { accessGuard } from '@middlewares/auth.middleware';

const setRoutes = (app: Express) => {
  app.use('/register', accessGuard, mountRoute(app));
};

export default setRoutes;
