import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { oautherClient } from '@/utils/auth/oauther-client';
import { validate } from '@/middlewares/controller/validation.middleware';
import { LoginValidator, RegisterCustomerValidator } from '@/types/validators/auth';
import { AuthService } from '@/services/auth';
import { CryptoMsService } from '@/utils/crypto-ms/http-service';
import { InexistentUserException } from '@/exceptions/auth.exception';

export default class AuthController {
  constructor(private authService: AuthService) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: Request, res: Response) {
    try {
      const dto = req.body as z.infer<typeof LoginValidator>;
      const credentials = await this.authService.login(dto);

      res.status(200).send(credentials);
    } catch (error) {
      if (error instanceof InexistentUserException) {
        res.status(400).send({
          error: 'Inexistent user',
        });
      } else {
        res.status(400).send({
          error: 'Invalid credentials',
        });
      }
    }
  }

  async register(req: Request, res: Response) {
    const dto = req.body as z.infer<typeof RegisterCustomerValidator>;
    await this.authService.register(dto);

    res.send({
      message: 'User created successfully',
    });
  }
}

export const mountRoute = () => {
  const router = Router();

  const registerController = new AuthController(
    new AuthService(oautherClient, new CryptoMsService()),
  );
  router.post('/register', validate(RegisterCustomerValidator), registerController.register);
  router.post('/login', validate(LoginValidator), registerController.login);

  return router;
};
