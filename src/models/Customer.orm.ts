import { Table, Column, Model, Unique, DataType, NotNull } from 'sequelize-typescript';

export enum CustomerType {
  NATURAL_PERSON = 'legal_person',
  LEGAL_PERSON = 'natural_person',
}

@Table({ tableName: 'customer', paranoid: true })
class CustomerORM extends Model {
  declare id: number;

  @NotNull
  @Column
  name: string;

  @NotNull
  @Unique
  @Column
  email: string;

  @NotNull
  @Column(DataType.ENUM(...Object.values(CustomerType)))
  customerType: CustomerType;
}

export { CustomerORM };
