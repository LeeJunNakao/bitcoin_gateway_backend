import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { CreateConfigAPIKeyValidator } from '@/types/validators/config';
import { CustomerApiKeyORM } from '@/models/CustomerApiKeys';
import { generateRandomHash } from '@/utils/cypto';

type CreateAPIKeyDTO = {
  name: string;
  customerId: number;
};

export class ConfigService {
  async createAPIKey(dto: CreateAPIKeyDTO) {
    const customerApiKey = await CustomerApiKeyORM.create({
      uid: uuid(),
      customerId: dto.customerId,
      name: dto.name,
      apiKey: generateRandomHash(),
    });

    return {
      uid: customerApiKey.uid,
      name: customerApiKey.name,
      apiKey: customerApiKey.apiKey,
    };
  }
}
