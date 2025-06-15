import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { accessGuardMiddleware, customerAccessMiddleware } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/controller/validation.middleware';
import { CreateConfigAPIKeyValidator } from '@/types/validators/config';
import { ConfigService } from '@/services/config.service';

export default class ConfigController {
  constructor(private configService: ConfigService) {
    this.listCustomers = this.listCustomers.bind(this);
    this.createConfigAPIKey = this.createConfigAPIKey.bind(this);
    this.getConfigAPIKeys = this.getConfigAPIKeys.bind(this);
  }

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

    res.send({ keys: apiKeys });
  }

  async listCustomers(req: Request, res: Response) {
    const userId = req.internalData?.user.id!;

    const customers = await this.configService.listCustomers(userId);

    res.send({ customers });
  }
}

export const mountRoute = () => {
  const router = Router();

  const configController = new ConfigController(new ConfigService());
  router.post(
    '/api-key',
    customerAccessMiddleware,
    validate(CreateConfigAPIKeyValidator),
    configController.createConfigAPIKey,
  );
  router.get('/api-key', customerAccessMiddleware, configController.getConfigAPIKeys);
  router.get('/customers', configController.listCustomers);

  return router;
};
