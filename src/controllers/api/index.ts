import { Express, Router } from 'express';
import { mountRoute as paymentMountRoute } from './payment.controller';
import { paymentAPIAccessMiddleware } from '@/middlewares/auth.middleware';

const setRoutes = (app: Express) => {
  const router = Router();

  router.use('/payment', paymentAPIAccessMiddleware, paymentMountRoute());

  app.use('/api', router);
};

export default setRoutes;
