import {
  Table,
  Column,
  Model,
  NotNull,
  ForeignKey,
  Default,
  Unique,
  DataType,
} from 'sequelize-typescript';
import { CustomerORM } from './Customer.orm';

@Table({ tableName: 'customer_account', paranoid: true })
class CustomerAccountORM extends Model {
  declare id: number;

  @NotNull
  @ForeignKey(() => CustomerORM)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @NotNull
  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  page: number;

  @NotNull
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  account: number;
}

export { CustomerAccountORM };
