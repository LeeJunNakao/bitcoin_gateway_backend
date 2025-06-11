import { Table, Column, Model, DataType, NotNull, ForeignKey } from 'sequelize-typescript';
import { CustomerORM } from './Customer.orm';
import { BlockchainNetwork } from '@/types/entities/blockchain';

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
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  requestUID: string;

  @NotNull
  @ForeignKey(() => CustomerORM)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  expectedValue: string;

  @NotNull
  @Column({
    type: DataType.ENUM(...Object.values(BlockchainNetwork)),
    allowNull: false,
  })
  network: BlockchainNetwork;

  @NotNull
  @Column({
    type: DataType.ENUM(...Object.values(RequestCurrency)),
    allowNull: false,
  })
  currency: RequestCurrency;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  networkAddress: string;

  @NotNull
  @Column({
    type: DataType.ENUM(...Object.values(RequestStatus)),
    allowNull: false,
  })
  status: RequestStatus;

  @Column
  transactionHash: string;

  @Column
  description: string;
}

export { PaymentRequestORM };
