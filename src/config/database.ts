import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.ENV || 'local';

if (env === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.local' });
}

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: env === 'production' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  } : {},
});

export default sequelize;
