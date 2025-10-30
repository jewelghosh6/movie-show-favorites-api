import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

interface DBConfig {
  [env: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    dialectOptions?: any;
    migrationStorage?: string;
    migrationStorageTableName?: string;
    migrations?: any;
  };
}

console.log(process.env.DB_USERNAME)

const config: DBConfig = {
  development: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    migrationStorage: 'sequelize',
    migrations: {
      path: 'dist/db/migrations',
    },
    dialectOptions: {
      ssl: {
        require: true, // Enable SSL
        rejectUnauthorized: false, // For self-signed certificates
      },
    },
  },
  test: {
    username: 'root',
    password: '',
    database: 'test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: '',
    database: 'production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

export = config;
