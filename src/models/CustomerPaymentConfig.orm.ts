import { Table, Column, Model, Unique, DataType, NotNull, ForeignKey } from 'sequelize-typescript';
import { CustomerORM } from './Customer.orm';
import { UserORM } from './User.orm';

@Table({ tableName: 'customer_payment_config', paranoid: true })
class CustomerPaymentConfigORM extends Model {
  declare id: number;

  @NotNull
  @ForeignKey(() => CustomerORM)
  @Unique
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @NotNull
  @ForeignKey(() => UserORM)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  checkoutRedirect: string;
}

export { CustomerPaymentConfigORM };
