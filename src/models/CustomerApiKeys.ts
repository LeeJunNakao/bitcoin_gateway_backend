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

@Table({ tableName: 'customer_api_key', paranoid: true })
class CustomerApiKeyORM extends Model {
  declare id: number;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  uid: string;

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
  name: string;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  apiKey: string;
}

export { CustomerApiKeyORM };
