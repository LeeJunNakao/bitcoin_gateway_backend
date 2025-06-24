import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { PaymentService } from '@/services/api/payment.service';
import { validate } from '@/middlewares/controller/validation.middleware';
import { CreatePaymentRequestValidator } from '@/types/validators/api/payment';
import { getMonitorHandler } from '@/utils/blockchain/address-monitor';
import { PaymentProcessorMsService } from '@/utils/payment-processor-ms/http-service.util';

export default class PaymentController {
  constructor(private paymentService: PaymentService) {
    this.createPaymentRequest = this.createPaymentRequest.bind(this);
  }

  async createPaymentRequest(req: Request, res: Response) {
    const body = req.body as z.infer<typeof CreatePaymentRequestValidator>;

    const paymentRequest = await this.paymentService.createPaymentRequest({
      ...body,
      customerId: req.internalData?.customer?.id!,
    });

    res.send({ message: 'Value received', address: paymentRequest.networkAddress });
  }
}

export const mountRoute = () => {
  const router = Router();

  const registerController = new PaymentController(
    new PaymentService(new PaymentProcessorMsService()),
  );
  router.post(
    '/request',
    validate(CreatePaymentRequestValidator),
    registerController.createPaymentRequest,
  );

  return router;
};
