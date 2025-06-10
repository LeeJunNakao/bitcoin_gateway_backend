import { Table, Column, Model, Unique, DataType, NotNull } from 'sequelize-typescript';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Table({ tableName: 'user', paranoid: true })
class UserORM extends Model {
  declare id: number;

  @NotNull
  @Column
  name: string;

  @NotNull
  @Unique
  @Column
  email: string;

  @NotNull
  @Unique
  @Column(DataType.ENUM(...Object.values(UserRole)))
  role: UserRole;
}

export { UserORM };
