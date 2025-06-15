import { v4 as uuid } from 'uuid';
import { CustomerApiKeyORM } from '@/models/CustomerApiKeys';
import { generateRandomHash } from '@/utils/crypto';
import { CustomerORM } from '@/models/Customer.orm';
import { CustomerUserORM } from '@/models/CustomerUser.orm';
import { Op } from 'sequelize';

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

  async listCustomers(userId: number) {
    const customersUserRelationship = await CustomerUserORM.findAll({
      where: {
        userId,
      },
    });

    const customers = await CustomerORM.findAll({
      where: {
        id: {
          [Op.in]: customersUserRelationship.map((e) => e.customerId),
        },
      },
    });

    return customers.map((c) => ({ uid: c.uid, name: c.name }));
  }
}
