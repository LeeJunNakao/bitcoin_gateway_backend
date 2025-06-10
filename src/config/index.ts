import { Sequelize } from 'sequelize';
import * as config from '@/config/database';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

const sequelize = new Sequelize({ ...dbConfig, define: { underscored: true }, logging: false });

export const connectDatabase = async (cb?: (sequelize: Sequelize) => Promise<void>) => {
  try {
    await sequelize.authenticate();

    if (cb) {
      await cb(sequelize);
    }

    const sequelizeOptions = process.env.NODE_ENV === 'test' ? { force: true } : { alter: true };

    await sequelize.sync(sequelizeOptions);

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database: ', error);

    throw error;
  }
};

export { sequelize };
