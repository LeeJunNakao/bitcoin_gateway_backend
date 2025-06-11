import { Table, Column, Model, Unique, DataType, NotNull } from 'sequelize-typescript';

export enum CustomerType {
  NATURAL_PERSON = 'legal_person',
  LEGAL_PERSON = 'natural_person',
}

@Table({ tableName: 'customer', paranoid: true })
class CustomerORM extends Model {
  declare id: number;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  uid: string;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @NotNull
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @NotNull
  @Column({
    type: DataType.ENUM(...Object.values(CustomerType)),
    allowNull: false,
  })
  customerType: CustomerType;
}

export { CustomerORM };
