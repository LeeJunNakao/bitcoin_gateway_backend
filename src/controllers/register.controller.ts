import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { oautherClient } from '@/utils/auth/oauther-client';
import { validate } from '@/middlewares/controller/validation.middleware';
import { RegisterCustomerValidator } from '@/types/validators/register';
import { RegisterService } from '@/services/register.service';
import { CryptoMsService } from '@/utils/crypto-ms/http-service';

export default class RegisterController {
  constructor(private registerService: RegisterService) {
    this.register = this.register.bind(this);
  }

  async register(req: Request, res: Response) {
    const dto = req.body as z.infer<typeof RegisterCustomerValidator>;
    await this.registerService.register(dto);

    res.send({
      message: 'User created successfully',
    });
  }
}

export const mountRoute = () => {
  const router = Router();

  const registerController = new RegisterController(
    new RegisterService(oautherClient, new CryptoMsService()),
  );

  router.post('/', validate(RegisterCustomerValidator), registerController.register);

  return router;
};
