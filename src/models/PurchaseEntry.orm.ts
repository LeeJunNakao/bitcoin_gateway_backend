import { Table, Column, Model, DataType, NotNull, ForeignKey } from 'sequelize-typescript';
import { CustomerORM } from './Customer.orm';

enum RequestNetwork {
  BITCOIN = 'bitcoin',
}

enum RequestCurrency {
  BITCOIN = 'bitcoin',
}

enum RequestStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

@Table({ tableName: 'payment_request', paranoid: true })
class PaymentRequestORM extends Model {
  declare id: number;

  @NotNull
  @Column
  requestUID: string;

  @NotNull
  @ForeignKey(() => CustomerORM)
  @Column
  customerId: number;

  @NotNull
  @Column
  expectedValue: string;

  @NotNull
  @Column(DataType.ENUM(...Object.values(RequestNetwork)))
  network: RequestNetwork;

  @NotNull
  @Column(DataType.ENUM(...Object.values(RequestCurrency)))
  currency: RequestCurrency;

  @NotNull
  @Column
  networkAddress: string;

  @NotNull
  @Column(DataType.ENUM(...Object.values(RequestStatus)))
  status: RequestStatus;

  @Column
  transactionHash: string;

  @Column
  description: string;
}

export { PaymentRequestORM };
