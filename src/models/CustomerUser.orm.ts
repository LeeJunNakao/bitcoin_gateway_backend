import { Table, Column, Model, Unique, DataType, NotNull, ForeignKey } from 'sequelize-typescript';
import { CustomerORM } from './Customer.orm';
import { UserORM } from './User.orm';

export enum CustomerUserRole {
  OWNER = 'owner',
  COLABORATOR = 'colaborator',
}

@Table({ tableName: 'customer_user', paranoid: true })
class CustomerUserORM extends Model {
  declare id: number;

  @NotNull
  @ForeignKey(() => CustomerORM)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @NotNull
  @ForeignKey(() => UserORM)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @NotNull
  @Column({
    type: DataType.ENUM(...Object.values(CustomerUserRole)),
    allowNull: false,
  })
  role: CustomerUserRole;
}

export { CustomerUserORM };
