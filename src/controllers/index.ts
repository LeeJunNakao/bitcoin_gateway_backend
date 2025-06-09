import { Express } from 'express';
import AppRouter from './AppRoutes';
import { accessGuard } from '@middlewares/auth.middleware';

const setRoutes = (app: Express) => {
  app.use('/register', accessGuard, AppRouter);
};

export default setRoutes;
