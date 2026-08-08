import dotenv from 'dotenv';
dotenv.config();
export const config = {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/url-shortner',
    NODE_ENV: process.env.NODE_ENV || 'development',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
};
export default config;
