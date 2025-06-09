import { Table, Column, Model, Unique, DataType, NotNull } from 'sequelize-typescript';

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
}

export { UserORM };
