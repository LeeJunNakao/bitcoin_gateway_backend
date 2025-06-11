import { Table, Column, Model, ForeignKey, NotNull, DataType } from 'sequelize-typescript';
import { CustomerORM } from './Customer.orm';
import { BlockchainCoin } from '@/types/entities/blockchain';

@Table({ tableName: 'customer_coin_config', paranoid: true })
class CustomerCoinConfigORM extends Model {
  declare id: number;

  @NotNull
  @ForeignKey(() => CustomerORM)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  customerId: string;

  @NotNull
  @Column({
    type: DataType.ENUM(...Object.values(BlockchainCoin)),
    allowNull: false,
  })
  coin: BlockchainCoin;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pubkey: string;
}

export { CustomerCoinConfigORM };
