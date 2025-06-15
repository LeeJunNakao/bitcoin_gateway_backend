import { CustomerORM } from './Customer.orm';
import { CustomerAccountORM } from './CustomerAccount.orm';
import { CustomerApiKeyORM } from './CustomerApiKeys';
import { CustomerCoinConfigORM } from './CustomerCoinConfig.orm';
import { CustomerUserORM } from './CustomerUser.orm';
import { PaymentRequestORM } from './PaymentRequest.orm';
import { UserORM } from './User.orm';

export const models = [
  CustomerORM,
  UserORM,
  CustomerAccountORM,
  CustomerCoinConfigORM,
  CustomerUserORM,
  PaymentRequestORM,
  CustomerApiKeyORM,
];
