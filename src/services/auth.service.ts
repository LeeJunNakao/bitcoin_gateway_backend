import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { CustomerORM } from '@/models/Customer.orm';
import { UserORM, UserRole } from '@/models/User.orm';
import { CustomerUserORM, CustomerUserRole } from '@/models/CustomerUser.orm';
import { OautherClient } from '@oauther/oauther_client';
import { Transaction, UUID } from 'sequelize';
import { CryptoMsService } from '@/utils/crypto-ms/http-service.util';
import { CustomerAccountORM } from '@/models/CustomerAccount.orm';
import { BlockchainNetwork, BlockchainCoin } from '@/types/entities/blockchain';
import { CustomerCoinConfigORM } from '@/models/CustomerCoinConfig.orm';
import {
  LoginValidator,
  RegisterCustomerValidator,
  VerifyAuthenticationValidator,
} from '@/types/validators/auth';
import { InexistentUserException } from '@/exceptions/auth.exception';

export class AuthService {
  constructor(
    private oautherClient: OautherClient,
    private cryptoMsService: CryptoMsService,
  ) {}

  async register(customerData: z.infer<typeof RegisterCustomerValidator>) {
    const transaction = await CustomerORM.sequelize?.transaction();

    try {
      const customer = await CustomerORM.create(
        { ...customerData.customer, uid: uuid() },
        { transaction },
      );
      const existentUser = await UserORM.findOne({
        where: {
          email: customerData.user.email,
        },
      });

      const userOwner =
        existentUser ||
        (await UserORM.create(
          { ...customerData.user, uid: uuid(), role: UserRole.CUSTOMER },
          { transaction },
        ));

      await CustomerUserORM.create(
        {
          customerId: customer.id,
          userId: userOwner.id,
          role: CustomerUserRole.OWNER,
        },
        { transaction },
      );

      const oautherUser = await this.oautherClient.getUserData({ email: customerData.user.email });

      if (!oautherUser.user) {
        await this.oautherClient.register({
          email: customerData.user.email,
          password: customerData.user.password,
          roles: [UserRole.CUSTOMER],
        });
      }

      await this.createCustomerConfig(customer.id, transaction);

      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      throw error;
    }
  }

  private async createCustomerConfig(customerId: number, transaction?: Transaction) {
    const lastAccount = await CustomerAccountORM.findOne({ order: [['account', 'desc']] });
    const account = lastAccount ? lastAccount.account + 1 : 0;

    const xpub = await this.cryptoMsService.createPubkey(account, BlockchainNetwork.BITCOIN);

    await CustomerAccountORM.create(
      {
        customerId,
        account,
      },
      { transaction },
    );

    await CustomerCoinConfigORM.create(
      {
        customerId,
        coin: BlockchainCoin.BITCOIN,
        pubkey: xpub,
      },
      { transaction },
    );
  }

  async login(loginDto: z.infer<typeof LoginValidator>) {
    const user = await UserORM.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new InexistentUserException();
    }

    const response = await this.oautherClient.login(loginDto);

    return { token: response.token, user: { email: user.email, name: user.name } };
  }

  async verifyAuthentication(token: string) {
    try {
      const response = await this.oautherClient.verifyAuthentication(token);

      return !!response;
    } catch (error) {
      return false;
    }
  }
}
