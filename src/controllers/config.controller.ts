import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { validate } from '@/middlewares/controller/validation.middleware';
import { CreateConfigAPIKeyValidator } from '@/types/validators/config';
import { ConfigService } from '@/services/config.service';

export default class ConfigController {
  constructor(private configService: ConfigService) {}

  async createConfigAPIKey(req: Request, res: Response) {
    const dto = req.body as z.infer<typeof CreateConfigAPIKeyValidator>;

    const apiKey = await this.configService.createAPIKey({
      ...dto,
      customerId: req.internalData?.customer?.id!,
    });

    res.status(201).send(apiKey);
  }

  async getConfigAPIKeys(req: Request, res: Response) {
    const customerId = req.internalData?.customer?.id!;

    const apiKeys = await this.configService.listAPIKeys(customerId);

    return apiKeys;
  }
}

export const mountRoute = () => {
  const router = Router();

  const registerController = new ConfigController(new ConfigService());
  router.post(
    '/api-key',
    validate(CreateConfigAPIKeyValidator),
    registerController.createConfigAPIKey,
  );
  router.get('/api-key', registerController.createConfigAPIKey);

  return router;
};
