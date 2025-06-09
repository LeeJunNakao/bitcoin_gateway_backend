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
  @Column
  customerId: number;

  @NotNull
  @ForeignKey(() => UserORM)
  @Column
  userId: number;

  @NotNull
  @Column(DataType.ENUM(...Object.values(CustomerUserRole)))
  role: CustomerUserRole;
}

export { CustomerUserORM };
