import { Express, Router } from 'express';
import { mountRoute as paymentMountRoute } from './payment.controller';

const setRoutes = (app: Express) => {
  const router = Router();

  router.use('/payment', paymentMountRoute());

  app.use('/api', router);
};

export default setRoutes;
