import { Sequelize } from 'sequelize-typescript';
import * as config from '@/config/database';
import { models } from '@/models';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

const sequelize = new Sequelize({
  ...dbConfig,
  models: models,
  define: { underscored: true },
  logging: false,
});

export const connectDatabase = async (cb?: (sequelize: Sequelize) => Promise<void>) => {
  try {
    await sequelize.authenticate();

    if (cb) {
      await cb(sequelize);
    }

    const sequelizeOptions = process.env.NODE_ENV === 'test' ? { force: true } : {};

    await sequelize.sync(sequelizeOptions);

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database: ', error);

    throw error;
  }
};

export { sequelize };
