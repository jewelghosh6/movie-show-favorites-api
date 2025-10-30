import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
import { Favorite } from './models/favorite.model';

dotenv.config();

// ✅ Initialize Sequelize instance with sequelize-typescript
const sequelizeInstance = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // for self-signed certs
    },
  },
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  // ✅ Automatically load all models in the models directory
  models: [Favorite], 
});

export const initDB = async (): Promise<void> => {
  try {
    await sequelizeInstance.authenticate();
    console.log('✅ Database connected successfully.');

    // Optionally sync models with DB schema (use in dev only)
    // await sequelizeInstance.sync({ alter: true });
    console.log('✅ All models synchronized.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export default sequelizeInstance;
