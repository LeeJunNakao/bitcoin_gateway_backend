import { Table, Column, Model, DataType, NotNull, ForeignKey, Unique } from 'sequelize-typescript';
import { CustomerORM } from './Customer.orm';
import { BlockchainNetwork } from '@/types/entities/blockchain';
import { RequestStatus } from './PaymentRequest.orm';

enum RequestCurrency {
  BITCOIN = 'bitcoin',
}

@Table({ tableName: 'payment_request_processing_queue', paranoid: false })
class PaymentRequestProcessingQueueORM extends Model {
  declare id: number;

  @NotNull
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  requestUid: string;

  @NotNull
  @ForeignKey(() => CustomerORM)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @NotNull
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  expectedValue: bigint;

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
}

export { PaymentRequestProcessingQueueORM };
