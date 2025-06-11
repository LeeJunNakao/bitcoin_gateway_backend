import { Table, Column, Model, Unique, DataType, NotNull } from 'sequelize-typescript';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Table({ tableName: 'user', paranoid: true })
class UserORM extends Model {
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
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
  })
  role: UserRole;
}

export { UserORM };
