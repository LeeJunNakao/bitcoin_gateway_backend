import {
  Table,
  Column,
  Model,
  DataType,
  NotNull,
  ForeignKey,
  Unique,
  CreatedAt,
  AllowNull,
} from 'sequelize-typescript';
import { CustomerORM } from './Customer.orm';
import { BlockchainNetwork, BlockchainCoin } from '@/types/entities/blockchain';
import { RequestStatus } from '@/types/entities/payment';

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
    type: DataType.ENUM(...Object.values(BlockchainCoin)),
    allowNull: false,
  })
  currency: BlockchainCoin;

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

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  height: number;

  @Column
  transactionHash: string;

  @CreatedAt
  @AllowNull(false)
  @Column
  createdAt: Date;
}

export { PaymentRequestProcessingQueueORM };
