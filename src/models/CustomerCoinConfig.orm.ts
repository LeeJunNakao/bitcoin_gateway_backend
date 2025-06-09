import { Table, Column, Model, ForeignKey, NotNull, DataType } from 'sequelize-typescript';
import { CustomerORM } from './Customer.orm';

enum Coin {
  BITCOIN = 'bitcoin',
}

@Table({ tableName: 'customer_coin_config', paranoid: true })
class CustomerCoinConfigORM extends Model {
  declare id: number;

  @NotNull
  @ForeignKey(() => CustomerORM)
  @Column
  customerId: string;

  @NotNull
  @Column(DataType.ENUM(...Object.values(Coin)))
  coin: Coin;

  @NotNull
  @Column
  pubkey: string;
}

export { CustomerCoinConfigORM };
