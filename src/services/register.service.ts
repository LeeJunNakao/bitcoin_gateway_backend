import { z } from 'zod';
import { RegisterCustomerSchema } from '@/types/validators/register';
import { CustomerORM } from '@/models/Customer.orm';
import { UserORM, UserRole } from '@/models/User.orm';
import { CustomerUserORM, CustomerUserRole } from '@/models/CustomerUser.orm';
import { OautherClient } from '@oauther/oauther_client';

export class RegisterService {
  constructor(private oautherClient: OautherClient) {}

  async register(customerData: z.infer<typeof RegisterCustomerSchema>) {
    const transaction = await CustomerORM.sequelize.transaction();

    try {
      const customer = await CustomerORM.create(customerData.customer, { transaction });
      const userOwner = await UserORM.create(customerData.user, { transaction });

      await CustomerUserORM.create(
        {
          customerId: customer.id,
          userId: userOwner.id,
          role: CustomerUserRole.OWNER,
        },
        { transaction },
      );

      await this.oautherClient.register({
        email: customerData.user.email,
        password: customerData.user.password,
        roles: [UserRole.CUSTOMER],
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
