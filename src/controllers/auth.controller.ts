import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { oautherClient } from '@/utils/auth/oauther-client';
import { validate } from '@/middlewares/controller/validation.middleware';
import { RegisterCustomerValidator } from '@/types/validators/register';
import { LoginValidator } from '@/types/validators/auth';
import { AuthService } from '@/services/auth.service';

export default class AuthController {
  constructor(private authService: AuthService) {
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    const dto = req.body as z.infer<typeof LoginValidator>;
    const credentials = await this.authService.login(dto);

    res.status(200).send(credentials);
  }
}

export const mountRoute = () => {
  const router = Router();

  const registerController = new AuthController(new AuthService(oautherClient));

  router.post('/login', validate(RegisterCustomerValidator), registerController.login);

  return router;
};
