import { Sequelize } from 'sequelize';
import * as config from '@/config/database';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

const sequelize = new Sequelize(dbConfig, { define: { underscored: true } });

export { sequelize };
