import { Express, Request, Response, Router } from 'express';
import { oautherClient } from '@/utils/auth/oauther-client';
import { OautherClient, RegisterParams } from '@oauther/oauther_client';

export default class RegisterController {
  constructor(private oautherClient: OautherClient) {}

  async register(req: Request, res: Response) {
    const dto = req.body as RegisterParams;

    const registerResponse = await this.oautherClient.register(dto);
  }
}

export const mountRoute = (app: Express) => {
  const router = Router();

  const registerController = new RegisterController(oautherClient);

  router.post('/', registerController.register);

  return router;
};
