import { AppError } from "../errors/app.error.js"
import dotenv from 'dotenv';
dotenv.config();

const {
    PORT,
    MONGO_URI,
    JWT_SECRET
} = process.env;

if(!MONGO_URI || !JWT_SECRET){
    throw new AppError(".env file is missing", 500);
}

export const config = {
    port: Number(PORT) || 4500,
    mongo_uri: MONGO_URI,
    jwt_secret: JWT_SECRET
}

export default config;