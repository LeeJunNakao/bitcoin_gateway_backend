import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { PaymentService } from '@/services/api/payment.service';
import { validate } from '@/middlewares/controller/validation.middleware';
import { CreatePaymentRequestValidator } from '@/types/validators/api/payment';
import { getMonitorHandler } from '@/utils/blockchain/address-monitor';

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

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>', paymentRequest.networkAddress);

    const NetworkMonitor = getMonitorHandler(body.network);
    const networkMonitor = new NetworkMonitor();

    await networkMonitor.monitorAddress(paymentRequest.networkAddress, Number(body.value));

    res.send({ message: 'Value received' });
  }
}

export const mountRoute = () => {
  const router = Router();

  const registerController = new PaymentController(new PaymentService());
  router.post(
    '/request',
    validate(CreatePaymentRequestValidator),
    registerController.createPaymentRequest,
  );

  return router;
};
