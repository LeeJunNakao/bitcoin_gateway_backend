import { Express, Request, Response, Router } from 'express';
import { oautherClient } from '@/utils/auth/oauther-client';
import { OautherClient, RegisterParams } from '@oauther/oauther_client';
import { validate } from '@/middlewares/controller/validation.middleware';
import { RegisterCustomerSchema } from '@/types/validators/register';
import { RegisterService } from '@/services/register.service';
import { z } from 'zod';

export default class RegisterController {
  constructor(private registerService: RegisterService) {}

  async register(req: Request, res: Response) {
    const dto = req.body as z.infer<typeof RegisterCustomerSchema>;
    const registerResponse = await this.registerService.register(dto);
  }
}

export const mountRoute = (app: Express) => {
  const router = Router();

  const registerController = new RegisterController(new RegisterService(oautherClient));

  router.post('/', validate(RegisterCustomerSchema), registerController.register);

  return router;
};
