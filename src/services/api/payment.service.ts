import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { PaymentRequestORM, RequestStatus } from '@/models/PaymentRequest.orm';
import { getAddressHandler } from '@/utils/blockchain/address-handler';
import { CustomerAccountORM } from '@/models/CustomerAccount.orm';
import { CustomerCoinConfigORM } from '@/models/CustomerCoinConfig.orm';
import { CustomerConfigException } from '@/exceptions/blockchain.exception';
import { CreatePaymentRequestValidator } from '@/types/validators/api/payment';

export class PaymentService {
  async createPaymentRequest(
    dto: z.infer<typeof CreatePaymentRequestValidator> & { customerId: number },
  ) {
    const requestIndex = await PaymentRequestORM.count({
      where: {
        customerId: dto.customerId,
        network: dto.network,
      },
    });
    const coinConfig = await CustomerCoinConfigORM.findOne({
      where: {
        customerId: dto.customerId,
        coin: dto.coin,
      },
    });
    const wallet = await CustomerAccountORM.findOne({
      where: {
        customerId: dto.customerId,
      },
      order: [['page', 'DESC']],
    });

    if (!coinConfig || !wallet) {
      throw new CustomerConfigException();
    }

    const AddressHandler = getAddressHandler(dto.network);
    const addressHandler = new AddressHandler(coinConfig?.pubkey);

    const address = addressHandler.getAddress(wallet.page, wallet.account, requestIndex);

    const paymentRequest = await PaymentRequestORM.create({
      requestUID: uuid(),
      customerId: dto.customerId,
      expectedValue: Number(dto.value),
      network: dto.network,
      currency: dto.coin,
      networkAddress: address,
      status: RequestStatus.PENDING,
      description: dto.description,
    });

    return paymentRequest;
  }
}
