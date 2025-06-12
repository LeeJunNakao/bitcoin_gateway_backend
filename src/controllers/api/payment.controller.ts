import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { paymentAPIAccessMiddleware } from '@/middlewares/auth.middleware';

export default class PaymentController {
  constructor() {}

  async createPaymentRequest(req: Request, res: Response) {}
}

export const mountRoute = () => {
  const router = Router();

  const registerController = new PaymentController();
  router.post('/request', paymentAPIAccessMiddleware, registerController.createPaymentRequest);

  return router;
};
