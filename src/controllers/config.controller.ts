import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { validate } from '@/middlewares/controller/validation.middleware';
import { CreateConfigAPIKeyValidator } from '@/types/validators/config';
import { ConfigService } from '@/services/config.service';

export default class ConfigController {
  constructor(private configService: ConfigService) {}

  async configApiKey(req: Request, res: Response) {
    const dto = req.body as z.infer<typeof CreateConfigAPIKeyValidator>;

    const apiKey = await this.configService.createAPIKey({
      ...dto,
      customerId: req.internalData?.customer?.id!,
    });

    res.status(201).send(apiKey);
  }
}

export const mountRoute = () => {
  const router = Router();

  const registerController = new ConfigController(new ConfigService());
  router.post('/api-keys', validate(CreateConfigAPIKeyValidator), registerController.configApiKey);

  return router;
};
