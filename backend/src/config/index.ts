import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const config = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/url-shortner',
  NODE_ENV: process.env.NODE_ENV || 'development',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  JWT_SECRET: process.env.JWT_SECRET || 'replace-this-secret',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'replace-this-refresh-secret',
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || '15m',
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '7d',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3001',
  BASE_URL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
};

export type Config = typeof config;

export default config;
