import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.development file
dotenv.config({ 
  path: path.resolve(__dirname, '.env.development')
});

interface IConfig {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL?: string;
  JWT_SECRET?: string;
}

const getConfig = (): IConfig => {
  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.ACCESS_TOKEN_SECRET
  };
};

const getSanitzedConfig = (config: IConfig): IConfig => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config;
};

const config = getConfig();

export default config;