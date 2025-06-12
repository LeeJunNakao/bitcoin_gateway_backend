import { v4 as uuid } from 'uuid';
import { CustomerApiKeyORM } from '@/models/CustomerApiKeys';
import { generateRandomHash } from '@/utils/crypto';

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

  async listAPIKeys(customerId: number) {
    const customerApiKeys = await CustomerApiKeyORM.findAll({
      where: {
        customerId,
      },
    });

    return customerApiKeys;
  }
}
